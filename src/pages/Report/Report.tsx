import React from "react";
import { Container } from "../../globalStyles";
import { Balance } from "../../components/Balance/Balance";
import { BackgroundMain } from "../../components/BackgroundMain/BackgroundMain";
import { Box } from "../Expenses/Expenses.styled";
import CategoriesList from "../../components/Categories/CategoriesList/CategoriesList";
import SelDataPicker from "../../components/DatePicker/DatePicker";
import { ExpensesTypes } from "../../components/ExpensesTypes/ExpensesTypes";

const Report = () => {
  return (
    <BackgroundMain>
      <Container>
        <Balance />
        <SelDataPicker />
        <Box page="report">
          <ExpensesTypes />
          <CategoriesList />
        </Box>
      </Container>
    </BackgroundMain>
  );
};

export default Report;
