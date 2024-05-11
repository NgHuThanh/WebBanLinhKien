import React, { useEffect, useState } from "react";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import {
  getProductData,
  addProduct,
  deleteProduct,
  updateProduct,
} from "@/firebase/config3";
import { Product } from "@/model/product";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

const Product2 = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [updatedProductData, setUpdatedProductData] = useState<Product>({
    id: "",
    name: "",
    description: "",
    price: 0,
    offer: "",
    technical: "",
    image: "",
    rating: 0,
    saleinfor: 0,
    idcategories: "",
    newProductData: "",
  });
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const productListData = await getProductData();
        setProducts(productListData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data: ", error);
      }
    }
    fetchData();
  }, []);

  const handleAddProduct = async () => {
    setIsAddingProduct(true);
    setUpdatedProductData({
      id: "",
      name: "",
      description: "",
      price: 0,
      offer: "",
      technical: "",
      image: "",
      rating: 0,
      saleinfor: 0,
      idcategories: "",
      newProductData: "",
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setIsAddingProduct(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveProduct = async () => {
    if (isAddingProduct) {
      await addProduct(updatedProductData);
    } else {
      if (!selectedProduct) return;
      const updatedDataWithDefaultTechnical = {
        ...updatedProductData,
        technical: updatedProductData.technical || "",
      };
      await updateProduct(selectedProduct.id, updatedDataWithDefaultTechnical);
    }
    const updatedProducts = await getProductData();
    setProducts(updatedProducts);
    setOpenDialog(false);
  };

  const handleDeleteProduct = async (
    productId: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    await deleteProduct(productId);
    const updatedProducts = await getProductData();
    setProducts(updatedProducts);
  };

  const handleUpdateClick = (product: Product) => {
    setSelectedProduct(product);
    setUpdatedProductData(product);
    setOpenDialog(true);
  };

  if (loading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box>
      <h2>PRODUCT MANAGEMENT</h2>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddProduct}
        aria-label="Add Product"
      >
        <AddIcon />
      </Button>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {isAddingProduct ? "Add New Product" : "Update Product"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            name="name"
            value={updatedProductData.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            name="description"
            value={updatedProductData.description}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Price"
            fullWidth
            name="price"
            type="number"
            value={updatedProductData.price}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Offer"
            fullWidth
            name="offer"
            value={updatedProductData.offer}
            onChange={handleInputChange}
          />

          <TextField
            margin="dense"
            label="Image URL"
            fullWidth
            name="image"
            value={updatedProductData.image}
            onChange={handleInputChange}
          />

          <TextField
            margin="dense"
            label="Sale Information"
            fullWidth
            name="saleinfor"
            type="number"
            value={updatedProductData.saleinfor}
            onChange={handleInputChange}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveProduct}>Save</Button>
        </DialogActions>
      </Dialog>
      <Grid container spacing={2}>
        {products.map((product, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <Box
              style={{
                paddingTop: "20px",
              }}
            >
              <Button
                variant="outlined"
                size="small"
                onClick={(event) => {
                  event.stopPropagation();
                  handleDeleteProduct(product.id, event);
                }}
              >
                <DeleteIcon />
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleUpdateClick(product)}
              >
                <EditIcon />
              </Button>
            </Box>
            <Link href={`/detail/${product.id}`} underline="none">
              <Card
                sx={{
                  maxWidth: 300,
                  minHeight: 300,
                  backgroundColor: "#ffffff",
                  color: "#000000",
                }}
              >
                {" "}
                <CardMedia
                  component="img"
                  height="160"
                  image={product.image}
                  alt={product.image}
                  style={{
                    width: "100%",
                    height: "140px",
                    objectFit: "cover",
                  }}
                />
                <CardContent style={{ maxHeight: "160px", overflow: "hidden" }}>
                  <Typography
                    gutterBottom
                    variant="body1"
                    component="div"
                    style={{
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      fontSize: "16px",
                      fontWeight: "bold",
                      minHeight: "50px",
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="black"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    {(product.price * (1 - product.saleinfor / 100)).toFixed(0)}
                    $
                    <Typography
                      style={{
                        marginLeft: "5px",
                        color: "grey",
                        display: "flex",
                        fontSize: "14px",
                        textDecoration: "line-through",
                      }}
                    >
                      {product.price}$
                    </Typography>
                    <Typography
                      color="green"
                      style={{
                        marginLeft: "5px",
                        fontSize: "15px",
                        fontWeight: "bold",
                      }}
                    >
                      {product.saleinfor}% off
                    </Typography>
                  </Typography>

                  <Typography
                    variant="body2"
                    color="black"
                    style={{
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      fontSize: "12px",
                      fontWeight: "bold",
                      paddingTop: "10px",
                    }}
                  >
                    <LocalOfferIcon fontSize="inherit" /> {product.offer}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Product2;
