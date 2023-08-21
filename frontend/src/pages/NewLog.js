import LogForm from '../components/LogForm';

function NewLogPage() {
  console.log("New Event page")
  return <LogForm method="post" />;
}

export default NewLogPage;