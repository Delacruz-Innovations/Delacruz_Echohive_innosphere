import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SolutionsOverview from '../Components/SolutionsApp';
import SolutionDetail from '../Components/SolutionDetail';

const SolutionsPage = () => {
  return (
    <Routes>
      <Route index element={<SolutionsOverview />} />
      <Route path=":slug" element={<SolutionDetail />} />
    </Routes>
  );
};

export default SolutionsPage;