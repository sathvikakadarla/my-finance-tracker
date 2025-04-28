import connectionToDatabase from '@/lib/mongodb'; 
import budgetModel from '@/models/budgetModel'; // ✅

export async function GET() {
  await connectionToDatabase();
  const budgets = await budgetModel.find(); 
  return Response.json(budgets);
}

export async function POST(request) {
  await connectionToDatabase();
  const { category, amount } = await request.json();
  
  if (!category || !amount) {
    return Response.json({ message: 'Missing data' }, { status: 400 });
  }

  const newBudget = new budgetModel({ category, amount }); // ✅ use budgetModel
  await newBudget.save();
  return Response.json(newBudget);
}
