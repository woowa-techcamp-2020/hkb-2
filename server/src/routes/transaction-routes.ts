import { Router } from "express";
import { validateBody } from "../middlewares/validate-body";
import {
	createNewTransaction,
	getAllTransactions,
} from "../service/transaction-service";
import { ICreateTransaction } from "../repository/transaction-repository";

const transactionRouter = Router();

transactionRouter.post(
	"/",
	validateBody<ICreateTransaction>([
		"content",
		"price",
		"paymentId",
		"userId",
		"categoryId",
	]),
	createNewTransaction
);

transactionRouter.get("/", getAllTransactions);

export default transactionRouter;
