import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { educationSections } from "../data/EducationSection";

export default function Glossary() {
  const { title, terms } = educationSections.glossary;
  const [search, setSearch] = useState("");

  const filteredTerms = terms.filter((term) =>
    term.term.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {title}
      </Typography>

      <TextField
        fullWidth
        label="Search glossary..."
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ my: 3 }}
      />

      <List disablePadding>
        {filteredTerms.map(({ term, definition }, index) => (
          <Box key={index}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={
                  <Typography variant="subtitle1" fontWeight={600}>
                    {term}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    {definition}
                  </Typography>
                }
              />
            </ListItem>
            {index < filteredTerms.length - 1 && <Divider />}
          </Box>
        ))}

        {filteredTerms.length === 0 && (
          <Typography variant="body2" color="text.secondary" mt={2}>
            No matching terms found.
          </Typography>
        )}
      </List>
    </Container>
  );
}
