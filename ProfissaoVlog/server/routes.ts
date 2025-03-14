import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { z } from "zod";
import { 
  insertVideoSchema, 
  insertPurchaseSchema, 
  insertRatingSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication
  setupAuth(app);

  // Initialize categories if they don't exist
  await initializeCategories();

  // Categories endpoints
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  // Videos endpoints
  app.get("/api/videos", async (req, res) => {
    try {
      const categoryId = req.query.categoryId ? parseInt(req.query.categoryId as string) : undefined;
      const videos = await storage.getVideosWithDetails(categoryId);
      res.json(videos);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch videos" });
    }
  });

  app.get("/api/videos/:id", async (req, res) => {
    try {
      const videoId = parseInt(req.params.id);
      const video = await storage.getVideoWithDetails(videoId);
      
      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }
      
      res.json(video);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch video" });
    }
  });

  app.post("/api/videos", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.user?.userType !== "professional") {
      return res.status(403).json({ message: "Only professionals can create videos" });
    }

    try {
      const validatedData = insertVideoSchema.parse({
        ...req.body,
        userId: req.user.id
      });
      
      const newVideo = await storage.createVideo(validatedData);
      res.status(201).json(newVideo);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid video data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create video" });
    }
  });

  // Professionals endpoints
  app.get("/api/professionals", async (req, res) => {
    try {
      const professionals = await storage.getProfessionalsWithVideos();
      res.json(professionals);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch professionals" });
    }
  });

  app.get("/api/professionals/:id", async (req, res) => {
    try {
      const professionalId = parseInt(req.params.id);
      const professional = await storage.getProfessionalWithVideos(professionalId);
      
      if (!professional) {
        return res.status(404).json({ message: "Professional not found" });
      }
      
      res.json(professional);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch professional" });
    }
  });

  // Purchases endpoints
  app.post("/api/purchases", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.user?.userType !== "student") {
      return res.status(403).json({ message: "Only students can make purchases" });
    }

    try {
      const validatedData = insertPurchaseSchema.parse({
        ...req.body,
        userId: req.user.id
      });
      
      // Check if the video exists
      const video = await storage.getVideo(validatedData.videoId);
      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }

      // Check if the student already purchased this video
      const existingPurchase = await storage.getUserPurchaseByVideoId(req.user.id, validatedData.videoId);
      if (existingPurchase) {
        return res.status(400).json({ message: "Video already purchased" });
      }

      const newPurchase = await storage.createPurchase(validatedData);
      res.status(201).json(newPurchase);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid purchase data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create purchase" });
    }
  });

  app.get("/api/purchases/user", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const purchases = await storage.getUserPurchases(req.user.id);
      res.json(purchases);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch purchases" });
    }
  });

  // Ratings endpoints
  app.post("/api/ratings", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.user?.userType !== "student") {
      return res.status(403).json({ message: "Only students can create ratings" });
    }

    try {
      const validatedData = insertRatingSchema.parse({
        ...req.body,
        userId: req.user.id
      });
      
      // Check if the video exists
      const video = await storage.getVideo(validatedData.videoId);
      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }

      // Check if the student has purchased this video
      const purchase = await storage.getUserPurchaseByVideoId(req.user.id, validatedData.videoId);
      if (!purchase) {
        return res.status(403).json({ message: "You must purchase the video before rating it" });
      }

      // Check if the user already rated this video
      const existingRating = await storage.getUserRatingByVideoId(req.user.id, validatedData.videoId);
      let newRating;
      
      if (existingRating) {
        // Update existing rating
        newRating = await storage.updateRating(existingRating.id, validatedData);
      } else {
        // Create new rating
        newRating = await storage.createRating(validatedData);
      }
      
      res.status(201).json(newRating);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid rating data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create rating" });
    }
  });

  app.get("/api/ratings/video/:id", async (req, res) => {
    try {
      const videoId = parseInt(req.params.id);
      const ratings = await storage.getVideoRatings(videoId);
      res.json(ratings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch ratings" });
    }
  });

  // Dashboard endpoints
  app.get("/api/dashboard/professional", async (req, res) => {
    if (!req.isAuthenticated() || req.user?.userType !== "professional") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const videos = await storage.getUserVideos(req.user.id);
      const videoIds = videos.map(video => video.id);
      
      // Get all purchases for these videos
      const purchases = await storage.getVideosPurchases(videoIds);
      
      // Get all ratings for these videos
      const ratings = await storage.getVideosRatings(videoIds);
      
      res.json({
        videos,
        purchases,
        ratings
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dashboard data" });
    }
  });

  app.get("/api/dashboard/student", async (req, res) => {
    if (!req.isAuthenticated() || req.user?.userType !== "student") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const purchases = await storage.getUserPurchasesWithVideos(req.user.id);
      const ratings = await storage.getUserRatings(req.user.id);
      
      res.json({
        purchases,
        ratings
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dashboard data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Helper function to initialize categories
async function initializeCategories() {
  const existingCategories = await storage.getAllCategories();
  
  if (existingCategories.length === 0) {
    const categoriesToCreate = [
      { name: "technology", displayName: "Tecnologia", color: "#3A86FF" },
      { name: "health", displayName: "Saúde", color: "#28A745" },
      { name: "engineering", displayName: "Engenharia", color: "#FFC107" },
      { name: "law", displayName: "Direito", color: "#0D47A1" },
      { name: "education", displayName: "Educação", color: "#6A1B9A" },
      { name: "marketing", displayName: "Marketing", color: "#DC3545" },
      { name: "finance", displayName: "Finanças", color: "#198754" },
      { name: "arts", displayName: "Artes", color: "#F44336" }
    ];

    for (const category of categoriesToCreate) {
      await storage.createCategory(category);
    }
  }
}
