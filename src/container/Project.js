import React, { Component } from 'react';
import { fetchProject } from '../api/project';
import {
  Grid,
  withStyles,
  Typography,
  CircularProgress,
  Link,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { FETCHING_STATUS } from '../api/constants';
import DownloadsComponent from '../components/DownloadsComponent';
import ProjectSummary from '../components/ProjectSummary';
import BadgesComponent from '../components/BadgesComponent';
import Notification from '../components/Notification';
import SearchAppBar from '../components/SearchAppBar';
import { Helmet } from 'react-helmet';
import Footer from '../components/Footer';
import CarbonAds from '../components/CarbonAds';
import Emoji from '../components/Emoji';

const styles = theme => ({
  layout: {
    width: 'auto',
    paddingBottom: theme.spacing(2),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(2),
    [theme.breakpoints.up(900 + theme.spacing(3 * 2))]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
});

const mapStateToProps = state => {
  return {
    project: state.project,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchProject: projectId => {
    dispatch(fetchProject(projectId));
  },
});

class Project extends Component {
  componentDidMount() {
    this.props.fetchProject(this.props.projectId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.projectId !== this.props.projectId) {
      this.props.fetchProject(this.props.projectId);
    }
  }

  render() {
    const { classes } = this.props;

    if (this.props.project.status !== FETCHING_STATUS.fetched) {
      return (
        <>
          <SearchAppBar />
          <Grid container className={classes.layout} justify="center">
            <Grid item>
              <CircularProgress />
            </Grid>
          </Grid>
        </>
      );
    }

    var lastDate = new Date('2020-04-10').setHours(0, 0, 0, 0);
    var today = new Date().setHours(0, 0, 0, 0);
    var notification = null;
    if (today < lastDate) {
      notification = (
        <Grid item xs={12}>
          <Notification
            severity="info"
            message={
              <Typography>
                If you find pepy.tech useful, <Emoji symbol="⛑️"/> support it with a donation{' '}
                <Link
                  aria-label="Patreon link"
                  color="textSecondary"
                  component="a"
                  href="https://www.patreon.com/pepy"
                >
                  here!
                </Link>
              </Typography>
            }
          />
        </Grid>
      );
    }

    return (
      <>
        <Helmet>
          <title>PePy - {this.props.project.id} Download Stats</title>
          <meta
            name="description"
            content={
              'Check the download stats of ' +
              this.props.project.id +
              ' library. It has a total of ' +
              this.props.project.total_downloads +
              ' downloads.'
            }
          />
        </Helmet>
        <SearchAppBar />
        <Grid container className={classes.layout} spacing={2}>
          {notification}
          <Grid item xs={12}>
            <Typography component="h1" variant="h2">
              {this.props.project.id}
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <ProjectSummary
              totalDownloads={this.props.project.total_downloads}
              totalDownloads30Days={Object.values(
                this.props.project.downloads
              ).reduce((carry, x) => carry + x)}
              totalDownloads7Days={Object.values(this.props.project.downloads)
                .slice(0, 7)
                .reduce((carry, x) => carry + x)}
              name={this.props.project.id}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CarbonAds />
          </Grid>
          <Grid item xs={12}>
            <BadgesComponent project={this.props.project.id} />
          </Grid>
          <Grid item xs={12}>
            <DownloadsComponent downloads={this.props.project.downloads} />
          </Grid>
        </Grid>
        <Footer />
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Project));
