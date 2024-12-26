import { Request, Response } from "express";
import { IProfile } from "../models/profileModel";
import Profile from "../models/profileModel";

class ProfileController {
  // Create or Update Profile

  async getAll(req: Request, res: Response) {
    try {
      const profiles = await Profile.find();
      res.status(200).json(profiles);
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const {
        fullname,
        birth,
        jobTitle,
        location,
        phoneNumber,
        gender,
        avatar,
        username,
        email
      } = req.body;
      
      if (!username) {
        res.status(400).json({ message: "username is required" });
      } else {
        const existingProfile = await Profile.findOne({ username });

        if (existingProfile) {
          res.status(400).json({ message: "Profile already exists" });
        } else {
          const profileData: Partial<IProfile> = {
            fullname,
            birth,
            jobTitle,
            location,
            phoneNumber,
            gender,
            avatar,
            username,
            email
          };
          
          const newProfile = new Profile(profileData);
          
          await newProfile.save();
          res.status(201).json({
            message: "Profile created successfully",
            profile: newProfile,
          });
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error", error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const {
        fullname,
        birth,
        jobTitle,
        location,
        phoneNumber,
        gender,
        avatar,
        username,
      } = req.body;

      if (!username) {
        res.status(400).json({ message: "username is required" });
      } else {
        const profileData: Partial<IProfile> = {
          fullname,
          birth,
          jobTitle,
          location,
          phoneNumber,
          gender,
          avatar,
          username,
        };

        // Upsert profile (create if doesn't exist, update if exists)
        const profile = await Profile.findOneAndUpdate(
          { username },
          profileData,
          { new: true, upsert: true } // upsert: create if doesn't exist
        );
        res
          .status(200)
          .json({ message: "Profile saved successfully", profile });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }
  // Fetch Profile
  async get(req: Request, res: Response) {
    try {
      const { username } = req.body;

      if (!username) {
        res.status(400).json({ message: "username is required" });
      }

      const profile = await Profile.findOne({ username });

      if (!profile) {
        res.status(404).json({ message: "Profile not found" });
      } else {
        res.status(200).json(profile);
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { username } = req.body;

      if (!username) {
        res.status(400).json({ message: "username is required" });
      } else {
        const profile = await Profile.deleteOne({ username });
        res
          .status(200)
          .json({ message: "Profile deleted successfully", profile });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }
}

export default new ProfileController();
