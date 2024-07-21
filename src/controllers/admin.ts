import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAdminDashboard = (req: Request, res: Response) => {
  res.send("Admin Dashboard");
};

export const postArticle = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const {
      title,
      user,
      category,
      seoTitle,
      seoKeyword,
      shortDescription,
      description,
      //@ts-ignore
    } = req.body;
    const article = await prisma.article.create({
      data: {
        title,
        user,
        category,
        seoTitle,
        seoKeyword,
        shortDescription,
        description,
      },
    });
    return res
      .status(200)
      .json({ success: true, message: "Article Created", article });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Read all articles
export const getArticles = async (req: Request, res: Response) => {
  try {
    const articles = await prisma.article.findMany();
    return res.status(200).json({ success: true, articles });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Read a single article by ID
export const getArticleById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const article = await prisma.article.findUnique({
      where: { id: Number(id) },
    });
    if (article) {
      return res.status(200).json({ success: true, article });
    }
    return res
      .status(404)
      .json({ success: false, message: "Article not found" });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update an article by ID
export const updateArticle = async (req: Request, res: Response) => {
  const { id } = req.params;
  //@ts-ignore
  const {
    title,
    user,
    category,
    seoTitle,
    seoKeyword,
    shortDescription,
    description,
    //@ts-ignore
  } = req.body;
  try {
    const article = await prisma.article.update({
      where: { id: Number(id) },
      data: {
        title,
        user,
        category,
        seoTitle,
        seoKeyword,
        shortDescription,
        description,
      },
    });
    return res
      .status(200)
      .json({ success: true, message: "Article Updated", article });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Delete an article by ID
export const deleteArticle = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.article.delete({
      where: { id: Number(id) },
    });
    return res.status(200).json({ success: true, message: "Article Deleted" });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Search articles by title
export const searchArticlesByTitle = async (req: Request, res: Response) => {
  //@ts-ignore
  const { title } = req.body;
  try {
    const articles = await prisma.article.findMany({
      where: {
        title: {
          contains: title as string,
          mode: "insensitive",
        },
      },
    });
    return res.status(200).json({ success: true, articles });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const postService = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const { title, type, shortDescription, description } = req.body;
    const service = await prisma.service.create({
      data: {
        title,
        type,
        shortDescription,
        description,
      },
    });
    return res
      .status(200)
      .json({ success: true, message: "Article Created", service });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};



  
  // Read all services
  export const getServices = async (req: Request, res: Response) => {
    try {
      const services = await prisma.service.findMany();
      return res.status(200).json({ success: true, services });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };
  
  // Read a single service by ID
  export const getServiceById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const service = await prisma.service.findUnique({
        where: { id: Number(id) },
      });
      if (service) {
        return res.status(200).json({ success: true, service });
      }
      return res.status(404).json({ success: false, message: "Service not found" });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };
  
  // Update a service by ID
  export const updateService = async (req: Request, res: Response) => {
    const { id } = req.params;
    //@ts-ignore
    const { title, type, shortDescription, description } = req.body;
    try {
      const service = await prisma.service.update({
        where: { id: Number(id) },
        data: {
          title,
          type,
          shortDescription,
          description,
        },
      });
      return res.status(200).json({ success: true, message: "Service Updated", service });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };
  
  // Delete a service by ID
  export const deleteService = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await prisma.service.delete({
        where: { id: Number(id) },
      });
      return res.status(200).json({ success: true, message: "Service Deleted" });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };
  
  // Search services by title
  export const searchServicesByTitle = async (req: Request, res: Response) => {
    const { title } = req.query;
    try {
      const services = await prisma.service.findMany({
        where: {
          title: {
            contains: title as string,
            mode: 'insensitive',
          },
        },
      });
      return res.status(200).json({ success: true, services });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };


export const postJobs = async (req: Request, res: Response) => {
    try {
      const {
        companyName,
        jobTitle,
        salaryRange,
        category,
        vacancy,
        jobType,
        jobLocation,
        jobDescription,
        contactNumber,
        openTill,
        //@ts-ignore
      } = req.body;
      const jobs = await prisma.job.create({
        data: {
          companyName,
          jobTitle,
          salaryRange,
          category,
          vacancy,
          jobType,
          jobLocation,
          jobDescription,
          contactNumber,
          openTill,
        },
      });
      return res.status(200).json({ success: true, message: "Jobs Created", jobs });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };
  
  // Read all jobs
  export const getJobs = async (req: Request, res: Response) => {
    try {
      const jobs = await prisma.job.findMany();
      return res.status(200).json({ success: true, jobs });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };
  
  // Read a single job by ID
  export const getJobById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const job = await prisma.job.findUnique({
        where: { id: Number(id) },
      });
      if (job) {
        return res.status(200).json({ success: true, job });
      }
      return res.status(404).json({ success: false, message: "Job not found" });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };
  
  // Update a job by ID
  export const updateJob = async (req: Request, res: Response) => {
    const { id } = req.params;
    const {
      companyName,
      jobTitle,
      salaryRange,
      category,
      vacancy,
      jobType,
      jobLocation,
      jobDescription,
      contactNumber,
      openTill,
      //@ts-ignore
    } = req.body;
    try {
      const job = await prisma.job.update({
        where: { id: Number(id) },
        data: {
          companyName,
          jobTitle,
          salaryRange,
          category,
          vacancy,
          jobType,
          jobLocation,
          jobDescription,
          contactNumber,
          openTill,
        },
      });
      return res.status(200).json({ success: true, message: "Job Updated", job });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };
  
  // Delete a job by ID
  export const deleteJob = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await prisma.job.delete({
        where: { id: Number(id) },
      });
      return res.status(200).json({ success: true, message: "Job Deleted" });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };
  
  // Search jobs by title
  export const searchJobsByTitle = async (req: Request, res: Response) => {
    const { jobTitle } = req.query;
    try {
      const jobs = await prisma.job.findMany({
        where: {
          jobTitle: {
            contains: jobTitle as string,
            mode: 'insensitive',
          },
        },
      });
      return res.status(200).json({ success: true, jobs });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };