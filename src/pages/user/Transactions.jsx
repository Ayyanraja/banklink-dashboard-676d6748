import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, ArrowUpCircle, ArrowDownCircle, Calendar, DollarSign } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const Transactions = () => {
  const { toast } = useToast();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [transactionType, setTransactionType] = useState("deposit");
  const [formData, setFormData] = useState({
    accountId: "",
    amount: "",
    description: ""
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setTransactions([
        { id: "1", type: "deposit", amount: 1000.00, description: "Salary", accountNumber: "****1234", date: "2024-01-15", status: "completed" },
        { id: "2", type: "withdrawal", amount: 250.00, description: "Rent Payment", accountNumber: "****1234", date: "2024-01-14", status: "completed" },
        { id: "3", type: "deposit", amount: 500.00, description: "Freelance Work", accountNumber: "****5678", date: "2024-01-13", status: "completed" },
        { id: "4", type: "withdrawal", amount: 75.50, description: "Groceries", accountNumber: "****1234", date: "2024-01-12", status: "completed" },
        { id: "5", type: "deposit", amount: 2000.00, description: "Investment Return", accountNumber: "****5678", date: "2024-01-10", status: "completed" }
      ]);
      setLoading(false);
    }, 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const newTransaction = {
        id: String(transactions.length + 1),
        type: transactionType,
        amount: parseFloat(formData.amount),
        description: formData.description,
        accountNumber: `****${formData.accountId}`,
        date: new Date().toISOString().split('T')[0],
        status: "completed"
      };
      setTransactions([newTransaction, ...transactions]);
      toast({
        title: `${transactionType.charAt(0).toUpperCase() + transactionType.slice(1)} successful!`,
        description: `$${formData.amount} has been ${transactionType === 'deposit' ? 'deposited to' : 'withdrawn from'} your account.`,
      });
      setDialogOpen(false);
      setFormData({ accountId: "", amount: "", description: "" });
      setLoading(false);
    }, 1000);
  };

  const totalDeposits = transactions.filter(t => t.type === "deposit").reduce((sum, t) => sum + t.amount, 0);
  const totalWithdrawals = transactions.filter(t => t.type === "withdrawal").reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Transactions</h1>
          <p className="text-muted-foreground">Track all your financial activities</p>
        </div>
        
        <div className="flex gap-2">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2" onClick={() => setTransactionType("deposit")}>
                <ArrowDownCircle className="h-4 w-4" />
                Deposit
              </Button>
            </DialogTrigger>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2" onClick={() => setTransactionType("withdrawal")}>
                <ArrowUpCircle className="h-4 w-4" />
                Withdraw
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {transactionType === "deposit" ? "Make a Deposit" : "Make a Withdrawal"}
                </DialogTitle>
                <DialogDescription>
                  {transactionType === "deposit" 
                    ? "Add funds to your account" 
                    : "Withdraw funds from your account"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="accountId">Account</Label>
                  <Input
                    id="accountId"
                    placeholder="Enter last 4 digits"
                    value={formData.accountId}
                    onChange={(e) => setFormData({...formData, accountId: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="What is this for?"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Processing..." : `${transactionType === "deposit" ? "Deposit" : "Withdraw"} Funds`}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Deposits</p>
              <p className="text-2xl font-bold text-success">${totalDeposits.toFixed(2)}</p>
            </div>
            <ArrowDownCircle className="h-8 w-8 text-success" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Withdrawals</p>
              <p className="text-2xl font-bold text-destructive">${totalWithdrawals.toFixed(2)}</p>
            </div>
            <ArrowUpCircle className="h-8 w-8 text-destructive" />
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest financial activities</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      {transaction.date}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {transaction.type === "deposit" ? (
                        <ArrowDownCircle className="h-4 w-4 text-success" />
                      ) : (
                        <ArrowUpCircle className="h-4 w-4 text-destructive" />
                      )}
                      <span className="capitalize">{transaction.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className="font-mono text-sm">{transaction.accountNumber}</TableCell>
                  <TableCell className={transaction.type === "deposit" ? "text-success" : "text-destructive"}>
                    {transaction.type === "deposit" ? "+" : "-"}${transaction.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-success">{transaction.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {transactions.length === 0 && !loading && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <DollarSign className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="mb-2 text-lg font-semibold">No transactions yet</h3>
              <p className="text-sm text-muted-foreground">
                Your transaction history will appear here
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Transactions;
