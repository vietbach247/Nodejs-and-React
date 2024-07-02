import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import constant from "../axios";
import { Category } from "../types/Category";

type ListCategoryProps = {
  categories: Category[];
};

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "8px",
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      minHeight: "48px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const ListCategory: React.FC<ListCategoryProps> = ({ categories }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await constant.get("/category");
        const { data } = response;
        if (data && Array.isArray(data.movie)) {
          // Không cần setCategory nữa vì đã nhận categories từ prop
        } else {
          console.error("API returned unexpected data format:", data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategory();
  }, []);

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Thể loại
      </Button>
      
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {categories.map((category, index) => (
          <MenuItem
            key={category._id}
            onClick={handleClose}
            disableRipple
            style={{
              flexDirection: "column",
            }}
          >
            <Link
              to={`/category/${category._id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              {category.name}
            </Link>
          </MenuItem>
        ))}
      </StyledMenu>
    </div>
  );
};

export default ListCategory;
