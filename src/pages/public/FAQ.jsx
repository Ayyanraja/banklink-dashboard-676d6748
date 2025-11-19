import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What is BankAgg?",
      answer: "BankAgg is a banking aggregator platform that allows you to connect and manage multiple bank accounts from different financial institutions in one secure place. You can view balances, track transactions, and manage your finances all from a single dashboard."
    },
    {
      question: "Is BankAgg secure?",
      answer: "Yes, absolutely. We use bank-level encryption (256-bit SSL) to protect your data. We never store your banking credentials, and all connections to financial institutions use secure, read-only APIs. Your data is encrypted both in transit and at rest."
    },
    {
      question: "Which banks are supported?",
      answer: "We support connections to over 10,000 financial institutions worldwide, including major banks, credit unions, and digital banking platforms. If you don't see your bank, please contact us and we'll work to add it."
    },
    {
      question: "How much does it cost?",
      answer: "We offer multiple pricing plans to suit different needs. Our Basic plan is free and includes connections to up to 2 accounts. Premium plans start at $9.99/month with unlimited accounts and additional features. Check our Plans page for detailed pricing."
    },
    {
      question: "Can I transfer money between accounts?",
      answer: "Yes, users can initiate transfers, deposits, and withdrawals directly through the platform. All transactions are processed securely and in real-time."
    },
    {
      question: "What's the difference between User and Admin accounts?",
      answer: "User accounts are for individuals managing their personal bank accounts and transactions. Admin accounts are for bank administrators who need to manage banks, branches, and system users. Most customers will use User accounts."
    },
    {
      question: "How do I get started?",
      answer: "Simply click 'Get Started' or 'Login' to create an account. Once registered, you can start connecting your bank accounts immediately. The entire process takes less than 5 minutes."
    },
    {
      question: "Can I access BankAgg on mobile?",
      answer: "Yes! BankAgg is fully responsive and works on all devices including smartphones, tablets, and desktop computers. We also offer native mobile apps for iOS and Android (coming soon)."
    },
    {
      question: "What if I have issues connecting my bank?",
      answer: "If you experience any issues, our support team is here to help. You can reach us via email at support@bankagg.com or through the Contact page. We typically respond within 24 hours."
    },
    {
      question: "Can I export my transaction data?",
      answer: "Yes, premium users can export their transaction history in multiple formats including CSV, Excel, and PDF. This feature is useful for tax preparation and financial planning."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground">
            Find answers to common questions about BankAgg
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 rounded-lg border border-border bg-muted/30 p-6 text-center">
          <h3 className="mb-2 text-xl font-semibold">Still have questions?</h3>
          <p className="mb-4 text-muted-foreground">
            Our support team is here to help you with any questions.
          </p>
          <a 
            href="/contact" 
            className="text-primary hover:underline"
          >
            Contact Support →
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
