import React, { Component } from 'react';
import SearchAppBar from '../components/SearchAppBar';
import {
  Link,
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from '@mui/material';
import { withStyles } from '@mui/styles';
import Footer from '../components/Footer';
import Emoji from '../components/Emoji';
import { LoadingButton } from '@mui/lab';
import { subscribe } from '../api/subscribe';
import { connect } from 'react-redux';
import { FETCHING_STATUS } from '../api/constants';
import DoneIcon from '@mui/icons-material/DoneOutline';
import ErrorIcon from '@mui/icons-material/ErrorOutline';

const styles = (theme) => ({
  layout: {
    width: 'auto',
    flexGrow: 2,
    paddingBottom: theme.spacing(2),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  imgContainer: {
    objectFit: 'contain',
    [theme.breakpoints.up('md')]: {
      width: '80%',
    },
  },
  img: {
    maxWidth: '100%',
  },
  footer: {
    left: 0,
    bottom: 0,
    width: '100%',
  },
  subscribeSection: {
    marginTop: theme.spacing(8),
  },
  section: {
    marginTop: theme.spacing(8),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(12),
    },
  },
});

const mapStateToProps = (state) => {
  return {
    subscribe: state.subscribe,
  };
};

const mapDispatchToProps = (dispatch) => ({
  sendSubscribe: (email, project) => {
    dispatch(subscribe(email, project));
  },
});

class Newsletter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      project: '',
      errors: {},
    };
  }

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    this.props.sendSubscribe(this.state.email, this.state.project);
  };

  render() {
    const { classes } = this.props;

    var endIcon = null;
    if (this.props.subscribe.status === FETCHING_STATUS.fetched && this.props.subscribe.error !== 500) {
       endIcon = <ErrorIcon />
    } else if (this.props.subscribe.status === FETCHING_STATUS.fetched) {
      endIcon = <DoneIcon />
    }

    return (
      <>
        <SearchAppBar />
        <Grid container justifyContent="center" className={classes.layout}>
          <Grid item xs={12}>
            <Typography variant="h2">Monthly report</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              Get a useful downloads report directly to your inbox.
              <Emoji symbol="📊" /> This is the first iteration and we will
              listen to your feedback more carefully.
            </Typography>
          </Grid>
          <Grid
            item
            align="center"
            id="subscribe_action"
            className={classes.subscribeSection}
            xs={12}
          >
            <Grid container alignItems="center" justifyContent="center" spacing={4}>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel required htmlFor="email">
                      Email address
                    </InputLabel>
                    <Input
                      id="email"
                      aria-describedby="email-helper"
                      onChange={this.handleChange('email')}
                      value={this.state.email}
                    />
                    <FormHelperText id="email-helper">
                      We'll never share your email.
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="project">Project</InputLabel>
                    <Input
                      required
                      id="project"
                      aria-describedby="project-helper"
                      onChange={this.handleChange('project')}
                      value={this.state.project}
                    />
                    <FormHelperText id="project-helper">
                      The project you are interested in
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <LoadingButton
                    fullWidth
                    onClick={(e) => this.handleSubmit(e)}
                    endIcon={endIcon}
                    loading={
                      this.props.subscribe.status === FETCHING_STATUS.fetching
                    }
                    type="submit"
                    variant="contained"
                    size="medium"
                    color="primary"
                  >
                    Subscribe
                  </LoadingButton>
                </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid container alignItems="center" className={classes.section}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Compare to previous month</Typography>
                <Typography>
                  You will get two months of data, to compare how the project is
                  performing this month and the previous one.
                </Typography>
              </Grid>
              <Grid item className={classes.imgContainer} xs={12} sm={6}>
                <img
                  alt="Example of monthly download stats"
                  className={classes.img}
                  src="/newsletter/monthly_downloads.png"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid container alignItems="center" className={classes.section}>
              <Grid
                item
                className={classes.imgContainer}
                xs={12}
                sm={6}
                order={{ xs: 2, sm: 1 }}
              >
                <img
                  className={classes.img}
                  alt="Example of advanced stats"
                  src="/newsletter/advanced_stats.png"
                />
              </Grid>
              <Grid item xs={12} sm={6} order={{ xs: 1, sm: 2 }}>
                <Typography variant="h6">Advanced stats</Typography>
                <Typography>
                  Check how your project compares to other PyPI projects, what
                  are the growing versions, and the most popular ones.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid container alignItems="center" className={classes.section}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">More charts</Typography>
                <Typography>
                  You will have a deeper view of how your project versions are
                  distributed and how is the evolution of this versions. The
                  more you know the better.
                </Typography>
              </Grid>
              <Grid item className={classes.imgContainer} xs={12} sm={6}>
                <img
                  className={classes.img}
                  alt="Example of different graph"
                  src="/newsletter/downloads_per_version.png"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            align="center"
            className={classes.subscribeSection}
            xs={12}
          >
            <Link color="textSecondary" href="#subscribe_action">
              <Button variant="contained" size="large" color="primary">
                Subscribe now
              </Button>
            </Link>
          </Grid>
        </Grid>
        <div className={classes.footer}>
          <Footer />
        </div>
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Newsletter));
