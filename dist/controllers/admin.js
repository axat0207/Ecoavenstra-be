import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getAdminDashboard = (req, res) => {
    res.send("Admin Dashboard");
};
export const postArticle = async (req, res) => {
    try {
        //@ts-ignore
        const { title, user, category, seoTitle, seoKeyword, shortDescription, description,
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
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
// Read all articles
export const getArticles = async (req, res) => {
    try {
        const articles = await prisma.article.findMany();
        return res.status(200).json({ success: true, articles });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
// Read a single article by ID
export const getArticleById = async (req, res) => {
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
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
// Update an article by ID
export const updateArticle = async (req, res) => {
    const { id } = req.params;
    //@ts-ignore
    const { title, user, category, seoTitle, seoKeyword, shortDescription, description,
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
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
// Delete an article by ID
export const deleteArticle = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.article.delete({
            where: { id: Number(id) },
        });
        return res.status(200).json({ success: true, message: "Article Deleted" });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
// Search articles by title
export const searchArticlesByTitle = async (req, res) => {
    //@ts-ignore
    const { title } = req.body;
    try {
        const articles = await prisma.article.findMany({
            where: {
                title: {
                    contains: title,
                    mode: "insensitive",
                },
            },
        });
        return res.status(200).json({ success: true, articles });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
export const postService = async (req, res) => {
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
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
// Read all services
export const getServices = async (req, res) => {
    try {
        const services = await prisma.service.findMany();
        return res.status(200).json({ success: true, services });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
// Read a single service by ID
export const getServiceById = async (req, res) => {
    const { id } = req.params;
    try {
        const service = await prisma.service.findUnique({
            where: { id: Number(id) },
        });
        if (service) {
            return res.status(200).json({ success: true, service });
        }
        return res.status(404).json({ success: false, message: "Service not found" });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
// Update a service by ID
export const updateService = async (req, res) => {
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
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
// Delete a service by ID
export const deleteService = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.service.delete({
            where: { id: Number(id) },
        });
        return res.status(200).json({ success: true, message: "Service Deleted" });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
// Search services by title
export const searchServicesByTitle = async (req, res) => {
    const { title } = req.query;
    try {
        const services = await prisma.service.findMany({
            where: {
                title: {
                    contains: title,
                    mode: 'insensitive',
                },
            },
        });
        return res.status(200).json({ success: true, services });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
export const postJobs = async (req, res) => {
    try {
        const { companyName, jobTitle, salaryRange, category, vacancy, jobType, jobLocation, jobDescription, contactNumber, openTill,
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
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
// Read all jobs
export const getJobs = async (req, res) => {
    try {
        const jobs = await prisma.job.findMany();
        return res.status(200).json({ success: true, jobs });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
// Read a single job by ID
export const getJobById = async (req, res) => {
    const { id } = req.params;
    try {
        const job = await prisma.job.findUnique({
            where: { id: Number(id) },
        });
        if (job) {
            return res.status(200).json({ success: true, job });
        }
        return res.status(404).json({ success: false, message: "Job not found" });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
// Update a job by ID
export const updateJob = async (req, res) => {
    const { id } = req.params;
    const { companyName, jobTitle, salaryRange, category, vacancy, jobType, jobLocation, jobDescription, contactNumber, openTill,
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
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
// Delete a job by ID
export const deleteJob = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.job.delete({
            where: { id: Number(id) },
        });
        return res.status(200).json({ success: true, message: "Job Deleted" });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
// Search jobs by title
export const searchJobsByTitle = async (req, res) => {
    const { jobTitle } = req.query;
    try {
        const jobs = await prisma.job.findMany({
            where: {
                jobTitle: {
                    contains: jobTitle,
                    mode: 'insensitive',
                },
            },
        });
        return res.status(200).json({ success: true, jobs });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
