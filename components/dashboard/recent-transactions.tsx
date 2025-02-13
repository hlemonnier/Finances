import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const transactions = [
  { id: 1, description: "Supermarché", amount: -85.2, date: "2025-02-08" },
  { id: 2, description: "Salaire", amount: 2500.0, date: "2025-02-01" },
  { id: 3, description: "Restaurant", amount: -45.5, date: "2025-02-07" },
  { id: 4, description: "Essence", amount: -60.0, date: "2025-02-06" },
  { id: 5, description: "Prime", amount: 200.0, date: "2025-02-05" },
]

export function RecentTransactions() {
  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle>Transactions récentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
              <span className={`font-semibold ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                {transaction.amount.toFixed(2)} €
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

