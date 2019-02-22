import { NavBarHeight } from '../../components/NavBar/NavBar';

export default () => ({
  ProjectOverview: {
    padding: '40px 80px',
    paddingTop: `${NavBarHeight}`,
    marginBottom: '80px'
  },
  ProjectOverviewHead: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
