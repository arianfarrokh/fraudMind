import React from "react";
import { Box, Pagination, PaginationProps } from "@mui/material";

type CustomPaginateProps = Omit<
  PaginationProps,
  "count" | "page" | "onChange"
> & {
  pageCount: number;
  page: number;
  queryLoading?: boolean;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
};

const CustomPaginate: React.FC<CustomPaginateProps> = ({
  pageCount,
  page,
  queryLoading = false,
  onChange,
  ...rest
}) => {
  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Pagination
        count={pageCount}
        page={page}
        onChange={onChange}
        disabled={queryLoading}
        {...rest}
      />
    </Box>
  );
};

export default CustomPaginate;
