import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { educationSections } from "../data/EducationSection";

export default function Strategies() {
  const { title, content } = educationSections.strategies;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Dive into common strategies like value investing, growth investing,
        index investing, and more.
      </Typography>

      <Box>
        {content.map((item, index) => (
          <Accordion
            key={index}
            disableGutters
            elevation={1}
            sx={{ mb: 2, borderRadius: 2 }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${index}-content`}
              id={`panel-${index}-header`}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                {item.heading}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                {item.body}
              </Typography>
              {item.videoUrl && (
                <Box
                  sx={{
                    position: "relative",
                    paddingTop: "56.25%", // 16:9 aspect ratio
                    borderRadius: 2,
                    overflow: "hidden",
                    mt: 2,
                  }}
                >
                  <iframe
                    src={item.videoUrl}
                    title={item.heading}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      border: "none",
                    }}
                  />
                </Box>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
}
