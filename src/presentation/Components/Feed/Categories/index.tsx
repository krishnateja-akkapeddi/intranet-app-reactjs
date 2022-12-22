import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Paper from "@mui/material/Paper";
import { Card, Typography } from "@mui/material";
import { FetchCategories } from "../../../../domain/usages/fetch-categories";
import { CategoriesType } from "../../../../domain/models/categories";
export type Props = {
  fetchCategories: FetchCategories;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  category: string;
};

export default function Categories(props: Props) {
  const [value, setValue] = React.useState("0");
  const [categories, setCategories] = React.useState<CategoriesType>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("CATVAL", event.target.value);

    props.setCategory(event.target.value);
    setValue((event.target as HTMLInputElement).value);
  };
  async function fetchCategories() {
    const data = await props.fetchCategories.fetchCategories();
    setCategories(data);
  }
  React.useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <Paper
      elevation={2}
      sx={{
        width: "100%",
        paddingTop: "5px",
        paddingLeft: "5px",
        paddingBottom: "5px",
      }}
    >
      <div style={{ padding: "10px" }}>
        <FormControl>
          <FormLabel
            sx={{ fontWeight: 600, marginBottom: "10px", fontSize: 15 }}
            id="demo-controlled-radio-buttons-group"
          >
            Filter By Groups
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            {categories?.body?.map((category, ind) => {
              return (
                <FormControlLabel
                  key={category.categoryId}
                  value={category.categoryId}
                  control={<Radio size="small" />}
                  label={
                    <Typography fontSize={14}>{category.category}</Typography>
                  }
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </div>
    </Paper>
  );
}
