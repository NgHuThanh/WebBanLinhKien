import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AppBar, Box, Container, Grid, IconButton, Link, Stack, Toolbar, Typography } from "@mui/material";
interface MenuItemObject {
    title: string;
    url: string;
    icon: React.ReactNode;
  }
export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [currentMenu, setCurrentMenu] = useState(0);
    
    const menu: MenuItemObject[] = [
        { title: "Home", url: "/homegroup", icon: <HomeIcon /> },
        { title: "Search", url: "/movie-search", icon: <SearchIcon /> },
        { title: "Users", url: "/history", icon: <AccountCircleIcon /> },
      ];
    useEffect(() => {
    // Get the current route and update the currentMenu state
    const currentRouteIndex = menu.findIndex(
        (item) => item.url === router.pathname
    );
    if (currentRouteIndex !== -1) {
        setCurrentMenu(currentRouteIndex);
    }
    }, [router.pathname]);
    return (
      <main>
        <Stack sx={{padding:"-20px"}}>
          {children}
        </Stack>

        <AppBar
          position="fixed"
          style={{ top: "auto", bottom: -1, backgroundColor: "white" }}
        >
          <Toolbar>
            <Grid container >
              <Stack direction="row" gap={3}>
                {menu.map((item, index) => (
                  <Link href={item.url} key={item.url}>
                    <Box
                      onClick={() => setCurrentMenu(index)}
                      style={{ textAlign: "center", cursor: "pointer" }}
                    >
                      <IconButton
                        sx={{
                          color: `${currentMenu === index ? "#0296E5" : "#67686D"
                            }`,
                          padding: "12px 40px",
                          height: "26px",
                        }}
                      >
                        {item.icon}
                      </IconButton>
                      <Typography
                        variant="caption"
                        color={`${currentMenu === index ? "#0296E5" : "#67686D"
                          }`}
                      >
                        {item.title}
                      </Typography>
                    </Box>
                  </Link>
                ))}
              </Stack>
            </Grid>
          </Toolbar>
        </AppBar>
      </main>
    
    );
}