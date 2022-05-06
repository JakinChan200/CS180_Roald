import React from "react";
import "./SearchBar.css";

interface SearchProps {
  country: string;
  onResult: (e: string) => void;
  categories: { id: string; title: string }[];
}

export const SearchBar: React.FC<SearchProps> = ({ onResult, categories }) => {
  return (
    <select
      className="catselect"
      name="categories"
      defaultValue="default"
      onChange={(e) => {
        onResult(e.target.value);
      }}
    >
      {[
        <option value="default">Select a category...</option>,
        ...categories.map((category) => (
          <option value={category.id} key={category.id}>
            {category.title}
          </option>
        )),
      ]}
    </select>
  );
};
