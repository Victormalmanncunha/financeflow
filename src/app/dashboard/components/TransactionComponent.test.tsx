import { render, screen } from "@testing-library/react";
import Transaction from "./Transaction";
import "@testing-library/jest-dom";

describe("Transaction component", () => {
  it("Deve renderizar o ícone de ArrowUp para transações de tipo INCOME", () => {
    render(
      <Transaction
        id={1}
        userId={1}
        amount={100}
        type="INCOME"
        category="Salário"
        createdAt="2023-03-01"
        updatedAt="2023-03-01"
      />
    );

    // Verificar se o ícone ArrowUp foi renderizado
    expect(screen.getByTestId("arrow-up")).toBeInTheDocument();
  });

  it("Deve renderizar o ícone de ArrowDown para transações de tipo EXPENSE", () => {
    render(
      <Transaction
        id={2}
        userId={1}
        amount={50}
        type="EXPENSE"
        category="Alimentação"
        createdAt="2023-03-02"
        updatedAt="2023-03-02"
      />
    );

    // Verificar se o ícone ArrowDown foi renderizado
    expect(screen.getByTestId("arrow-down")).toBeInTheDocument();
  });

  it("Deve exibir o valor correto para transações de tipo INCOME", () => {
    render(
      <Transaction
        id={3}
        userId={1}
        amount={200}
        type="INCOME"
        category="Freelance"
        createdAt="2023-03-03"
        updatedAt="2023-03-03"
      />
    );

    // Verificar se o valor está correto e com o símbolo "+" antes do valor
    expect(screen.getByText("+ R$200.00")).toBeInTheDocument();
  });

  it("Deve exibir o valor correto para transações de tipo EXPENSE", () => {
    render(
      <Transaction
        id={4}
        userId={1}
        amount={150}
        type="EXPENSE"
        category="Transporte"
        createdAt="2023-03-04"
        updatedAt="2023-03-04"
      />
    );

    // Verificar se o valor está correto e com o símbolo "-" antes do valor
    expect(screen.getByText("- R$150.00")).toBeInTheDocument();
  });

  it("Deve renderizar a categoria da transação", () => {
    render(
      <Transaction
        id={5}
        userId={1}
        amount={75}
        type="EXPENSE"
        category="Lazer"
        createdAt="2023-03-05"
        updatedAt="2023-03-05"
      />
    );

    // Verificar se a categoria "Lazer" é exibida
    expect(screen.getByText("Lazer")).toBeInTheDocument();
  });
});
