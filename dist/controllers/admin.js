import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const getAdminDashboard = (req, res) => {
    res.send("Admin Dashboard");
};
export const postArticle = async (req, res) => {
    try {
        //@ts-ignore
        const { title, user, category, seoTitle, seoKeyword, shortDescription, description } = req.body;
        const article = await prisma.article.create({
            data: {
                title, user, category, seoTitle, seoKeyword, shortDescription, description
            }
        });
        return res.status(200).json({ sucess: true, message: "Article Created", article });
    }
    catch (error) {
        return res.status(500).json({ sucess: false, message: error.message });
    }
};
