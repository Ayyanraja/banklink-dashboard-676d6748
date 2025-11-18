import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ArrowUpCircle, ArrowDownCircle, FileText, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Transaction {
  id: string;
  type: "deposit" | "withdraw";
  amount: number;
  accountNumber: string;
  date: string;
  description: string;
  status: string;
}

const Transactions = () => {
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"deposit" | "withdraw">("deposit");
  const [formData, setFormData] = useState({
    amount: "",
    accountNumber: "****1234",
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
        {
          id: "1",
          type: "deposit",
          amount: 1500.00,
          accountNumber: "****1234",
          date: "2024-01-15",
          description: "Salary payment",
          status: "completed"
        },
        {
          id: "2",
          type: "withdraw",
          amount: 250.00,
          accountNumber: "****5678",
          date: "2024-01-14",
          description: "ATM withdrawal",
          status: "completed"
        },
        {
          id: "3",
          type: "deposit",
          amount: 500.00,
          accountNumber: "****9012",
          date: "2024-01-13",
          description: "Transfer from savings",
          status: "completed"
        },
        {
          id: "4",
          type: "withdraw",
          amount: 89.99,
          accountNumber: "****1234",
          date: "2024-01-12",
          description: "Online shopping",
          status: "completed"
        }
      ]);
      setLoading(false);
    }, 500);
  };

  const handleTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const transaction: Transaction = {
        id: String(transactions.length + 1),
        type: dialogType,
        amount: parseFloat(formData.amount),
        accountNumber: formData.accountNumber,
        date: new Date().toISOString().split('T')[0],
        description: formData.description,
        status: "completed"
      };
      setTransactions([transaction, ...transactions]);
      toast({
        title: `${dialogType === "deposit" ? "Deposit" : "Withdrawal"} successful!`,
        description: `$${formData.amount} has been processed.`,
      });
      setDialogOpen(false);
      setFormData({ amount: "", accountNumber: "****1234", description: "" });
      setLoading(false);
    }, 1000);
  };

  const openDialog = (type: "deposit" | "withdraw") => {
    setDialogType(type);
    setDialogOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Transactions</h1>
          <p className="text-muted-foreground">View and manage your transactions</p>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={() => openDialog("deposit")} className="gap-2 bg-success hover:bg-success/90">
            <ArrowDownCircle className="h-4 w-4" />
            Deposit
          </Button>
          <Button onClick={() => openDialog("withdraw")} variant="destructive" className="gap-2">
            <ArrowUpCircle className="h-4 w-4" />
            Withdraw
          </Button>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {dialogType === "deposit" ? "Make a Deposit" : "Make a Withdrawal"}
              </DialogTitle>
              <DialogDescription>
                {dialogType === "deposit" 
                  ? "Add funds to your account"
                  : "Withdraw funds from your account"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleTransaction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account</Label>
                <Select
                  value={formData.accountNumber}
                  onValueChange={(value) => setFormData({...formData, accountNumber: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="****1234">Chase Bank - ****1234</SelectItem>
                    <SelectItem value="****5678">Bank of America - ****5678</SelectItem>
                    <SelectItem value="****9012">Wells Fargo - ****9012</SelectItem>
                  </SelectContent>
                </Select>
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
                  placeholder="What's this for?"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className={`w-full ${dialogType === "deposit" ? "bg-success hover:bg-success/90" : ""}`}
                variant={dialogType === "withdraw" ? "destructive" : "default"}
                disabled={loading}
              >
                {loading ? "Processing..." : `${dialogType === "deposit" ? "Deposit" : "Withdraw"} Funds`}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest account activity</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Account</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={transaction.type === "deposit" ? "default" : "destructive"}
                      className={transaction.type === "deposit" ? "bg-success" : ""}
                    >
                      {transaction.type === "deposit" ? (
                        <ArrowDownCircle className="mr-1 h-3 w-3" />
                      ) : (
                        <ArrowUpCircle className="mr-1 h-3 w-3" />
                      )}
                      {transaction.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className="font-mono text-sm">{transaction.accountNumber}</TableCell>
                  <TableCell className={`text-right font-bold ${
                    transaction.type === "deposit" ? "text-success" : "text-destructive"
                  }`}>
                    {transaction.type === "deposit" ? "+" : "-"}${transaction.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{transaction.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {transactions.length === 0 && !loading && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
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
