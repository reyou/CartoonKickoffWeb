import AuthenticatedRoute from '../../Components/AuthenticatedRoute';
import VerticalTabs from '../../Components/VerticalTabs';
import PageLayout from '../../PageLayout';
import Email from './Components/Email';
import Password from './Components/Password';
import UserName from './Components/UserName';

export default function Account() {
  const tabContent = {
    Email: <Email></Email>,
    Password: <Password></Password>,
    Profile: <UserName></UserName>,
    Preferences: <div>Preferences content here</div>
  };
  return (
    <AuthenticatedRoute>
      <PageLayout title='Account'>
        <VerticalTabs tabContent={tabContent}></VerticalTabs>
      </PageLayout>
    </AuthenticatedRoute>
  );
}
