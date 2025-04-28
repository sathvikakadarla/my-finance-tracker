// app/api/transactions/route.js

import { NextResponse } from 'next/server';
import connectionToDatabase from '@/lib/mongodb'; // connect to MongoDB
import Transaction from '@/models/transactionModel'; // import the model

// POST: Create a new transaction
export async function POST(request) {
  await connectionToDatabase(); // Connect first

  const body = await request.json();
  const { amount, date, description } = body;

  if (!amount || !date || !description) {
    return NextResponse.json(
      { message: 'Amount, Date, and Description are required.' },
      { status: 400 }
    );
  }

  try {
    // Log transaction data to verify it's coming through
    console.log('Transaction Data:', { amount, date, description });

    const newTransaction = await Transaction.create({ amount, date, description });
    
    // Log the result of the insert operation
    console.log('New Transaction Created:', newTransaction);
    
    return NextResponse.json(newTransaction, { status: 201 });
  } catch (error) {
    console.log('Error creating transaction:', error);  // Log the error if any
    return NextResponse.json(
      { message: 'Failed to create transaction', error: error.message },
      { status: 500 }
    );
  }
}
// GET: Fetch all transactions
export async function GET() {
  await connectionToDatabase();

  try {
    const transactions = await Transaction.find().sort({ date: -1 }); // Most recent first
    return NextResponse.json(transactions, { status: 200 });
  } catch (error) {
    console.log('Error fetching transactions:', error);
    return NextResponse.json(
      { message: 'Failed to fetch transactions', error: error.message },
      { status: 500 }
    );
  }
}

// DELETE: Delete a transaction
export async function DELETE(request) {
  await connectionToDatabase();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { message: 'Transaction ID is required for deletion.' },
      { status: 400 }
    );
  }

  try {
    await Transaction.findByIdAndDelete(id);
    return NextResponse.json(
      { message: 'Transaction deleted successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.log('Error deleting transaction:', error);
    return NextResponse.json(
      { message: 'Failed to delete transaction', error: error.message },
      { status: 500 }
    );
  }
}

// PUT: Update a transaction
export async function PUT(request) {
  await connectionToDatabase();

  const body = await request.json();
  const { id, amount, date, description } = body;

  if (!id || !amount || !date || !description) {
    return NextResponse.json(
      { message: 'ID, Amount, Date, and Description are required for updating.' },
      { status: 400 }
    );
  }

  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      { amount, date, description },
      { new: true }
    );

    if (!updatedTransaction) {
      return NextResponse.json(
        { message: 'Transaction not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedTransaction, { status: 200 });
  } catch (error) {
    console.log('Error updating transaction:', error);
    return NextResponse.json(
      { message: 'Failed to update transaction', error: error.message },
      { status: 500 }
    );
  }
}
