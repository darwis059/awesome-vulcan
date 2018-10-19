import React from "react";

import { registerComponent, Components } from "meteor/vulcan:core";
import { FormattedMessage } from "meteor/vulcan:i18n";

import { withStyles } from "@material-ui/core/styles";

import PlusIcon from "mdi-material-ui/Plus";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import { Link } from "react-router";
import { intlShape } from "meteor/vulcan:i18n";

const styles = theme => ({
  loadMoreWrapper: {
    textAlign: "center",
    padding: theme.spacing.unit
  },
  titleWrapper: {
    flexGrow: 1
  }
});
const NoResults = () => (
  <Typography>
    <FormattedMessage id="common.no_results" />
  </Typography>
);
const ResultsGrid = (
  {
    query,
    onQueryChange,
    loadingMore,
    totalCount,
    count,
    loadMore,
    loading,
    results,
    classes,
    ItemComponent,
    title,
    titleToken,
    cols = 2,
    createPath
  },
  { intl }
) => {
  if (loading) return <Components.Loading />;

  const hasMore = count < totalCount;

  return (
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <Grid container>
          <Grid item className={classes.titleWrapper}>
            <Typography variant="display2" component="h1">
              {title || <FormattedMessage id={titleToken} />}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              component={Link}
              to={createPath}
              variant="contained"
              color="secondary"
            >
              <PlusIcon />
              <FormattedMessage id="common.propose" />
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TextField
          placeholder={intl.formatMessage({ id: "common.search" }) + "..."}
          value={query}
          onChange={onQueryChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={16}>
          {results && results.length ? (
            results.map(result => (
              <Grid key={result._id} item xs={12} md={12 / cols}>
                <ItemComponent item={result} />
              </Grid>
            ))
          ) : (
            <NoResults />
          )}
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
              <FormattedMessage id="common.load_more" />
            </Button>
          ))}
      </Grid>
    </Grid>
  );
};

ResultsGrid.contextTypes = {
  intl: intlShape
};
registerComponent({
  name: "ResultsGrid",
  component: ResultsGrid,
  hocs: [[withStyles, styles]]
});
export default ResultsGrid;
