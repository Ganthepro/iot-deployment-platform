import {
  Table,
  // TableBody,
  // TableCaption,
  // TableCell,
  // TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DeploymentTable() {
  return (
    <Table>
      {/* <TableCaption>A History of Deployment.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Device ID</TableHead>
          <TableHead>Deploy At</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Modules</TableHead>
        </TableRow>
      </TableHeader>
      {/* <TableBody className="text-start">
				{invoices.map((invoice) => (
					<TableRow key={invoice.invoice}>
						<TableCell className="font-medium">
							{invoice.invoice}
						</TableCell>
						<TableCell>{invoice.paymentStatus}</TableCell>
						<TableCell>{invoice.paymentMethod}</TableCell>
						<TableCell className="text-right">
							{invoice.totalAmount}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter className="text-start">
				<TableRow>
					<TableCell colSpan={3}>Total</TableCell>
					<TableCell className="text-right">$2,500.00</TableCell>
				</TableRow>
			</TableFooter> */}
    </Table>
  );
}
