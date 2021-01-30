
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons

// core components

import Header from "components/Header/Header.js";

import Button from "components/CustomButtons/Button.js";
function NavbarInfo() {
  return (
    <>
      <Header
        brand="Info Color"
        color="info"
        links={
          <List className={classes.list + " " + classes.mlAuto}>
            <ListItem className={classes.listItem}>
              <Button
                href="#pablo"
                className={classes.navLink + " " + classes.navLinkActive}
                onClick={(e) => e.preventDefault()}
                color="transparent"
              >
                Discover
              </Button>
            </ListItem>
            <ListItem className={classes.listItem}>
              <Button
                href="#pablo"
                className={classes.navLink}
                onClick={(e) => e.preventDefault()}
                color="transparent"
              >
                Profile
              </Button>
            </ListItem>
            <ListItem className={classes.listItem}>
              <Button
                href="#pablo"
                className={classes.navLink}
                onClick={(e) => e.preventDefault()}
                color="transparent"
              >
                Settings
              </Button>
            </ListItem>
          </List>
        }
      />
    </>
  );
}

export default NavbarInfo;
