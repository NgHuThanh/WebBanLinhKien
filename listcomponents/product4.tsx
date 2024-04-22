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
  db,
  getProductData,
  addProduct,
  deleteProduct,
  updateProduct,
} from "@/pages/firebase/config3"; // Import các hàm thao tác với cơ sở dữ liệu
import { Product } from "@/model/product"; // Import model sản phẩm

const Product2 = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [newProductData, setNewProductData] = useState<Product>({
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
  });

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
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveProduct = async () => {
    await addProduct(newProductData);
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

  const handleUpdateProduct = async (
    productId: string,
    newData: Partial<Product>
  ) => {
    await updateProduct(productId, newData);
    const updatedProducts = await getProductData();
    setProducts(updatedProducts);
  };

  if (loading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box>
      <Box>
        <h2>All Products</h2>
        <Button variant="contained" onClick={handleAddProduct}>
          Add Product
        </Button>
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            name="name"
            value={newProductData.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            name="description"
            value={newProductData.description}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Price"
            fullWidth
            name="price"
            type="number"
            value={newProductData.price}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Offer"
            fullWidth
            name="offer"
            value={newProductData.offer}
            onChange={handleInputChange}
          />

          <TextField
            margin="dense"
            label="Image URL"
            fullWidth
            name="image"
            value={newProductData.image}
            onChange={handleInputChange}
          />

          <TextField
            margin="dense"
            label="Sale Information"
            fullWidth
            name="saleinfor"
            type="number"
            value={newProductData.saleinfor}
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
                <CardContent style={{ maxHeight: "120px", overflow: "hidden" }}>
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
                    {(product.price * 0.8).toFixed(0)}$
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

                  <Button
                    variant="outlined"
                    onClick={(event) => handleDeleteProduct(product.id, event)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      handleUpdateProduct(product.id, { name: "New Name" })
                    }
                  >
                    Update
                  </Button>
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
