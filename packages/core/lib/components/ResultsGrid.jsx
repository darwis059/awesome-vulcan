import React from "react";

import { registerComponent, Components } from "meteor/vulcan:core";

import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  loadMoreWrapper: {
    textAlign: "center",
    padding: theme.spacing.unit
  }
});
const ResultsGrid = ({
  loadingMore,
  totalCount,
  count,
  loadMore,
  loading,
  results,
  classes,
  ItemComponent,
  title
}) => {
  if (loading) return <Components.Loading />;

  const hasMore = count < totalCount;

  return (
    <Grid container spacing={8}>
      <Grid item>
        <Typography variant="display2" component="h1">
          {title}
        </Typography>
      </Grid>
      <Grid item>
        <Grid container spacing={16}>
          {results.map(result => (
            <Grid key={result._id} item xs={12} md={6}>
              <ItemComponent item={result} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.loadMoreWrapper}>
        {hasMore &&
          (loadingMore ? (
            <Components.Loading />
          ) : (
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => loadMore()}
            >
              Load more
            </Button>
          ))}
      </Grid>
    </Grid>
  );
};

registerComponent({
  name: "ResultsGrid",
  component: ResultsGrid,
  hocs: [[withStyles, styles]]
});
export default ResultsGrid;
