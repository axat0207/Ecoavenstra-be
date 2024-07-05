import { Request, Response } from "express";

export const getEmployerDashboard = (req: Request, res: Response) => {
    res.send("Employer Dashboard");
}