import { useState, useEffect, useMemo } from "react";
import { TextField, CircularProgress, Autocomplete } from "@mui/material";
import axios from "axios";

export default function SearchBar({ onSelect }) {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedInput = useMemo(() => {
    let timeout;
    return (value) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => setInputValue(value), 300);
    };
  }, []);

  useEffect(() => {
    if (!inputValue) {
      setOptions([]);
      return;
    }
    let active = true;
    setLoading(true);

    (async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/stocks/search?query=${inputValue}`
        );
        if (active) setOptions(data);
      } catch {
        if (active) setOptions([]);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [inputValue]);

  return (
    <Autocomplete
      freeSolo
      filterOptions={(x) => x}
      options={options}
      getOptionLabel={(option) =>
        option.symbol && option.name
          ? `${option.symbol} — ${option.name} — $${option.price}`
          : ""
      }
      isOptionEqualToValue={(option, value) => option.symbol === value.symbol}
      loading={loading}
      onChange={(_, value) => {
        if (value) onSelect(value);
      }}
      onInputChange={(_, value, reason) => {
        if (reason === "input") debouncedInput(value.toUpperCase());
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search Stock"
          size="small"
          variant="outlined"
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(props, option, state) => {
        const uniqueKey = `${option.symbol}-${state.index}`;
        const { key, ...rest } = props;
        return (
          <li key={uniqueKey} {...rest}>
            <strong>{option.symbol || "?"}</strong> — {option.name} — $
            {option.price}
          </li>
        );
      }}
    />
  );
}
