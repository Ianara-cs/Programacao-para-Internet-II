import './App.css';
import { Heading } from "./components/Heading";
import { Section } from "./components/Section";
import { ProfilePage } from './Pages/ProfilePage';

export default function Page() {
  return (
    <div className='App'>
      <ProfilePage/>
      <Section>
        <Heading>Title</Heading>
        <Section>
          <Heading>Heading</Heading>
          <Heading>Heading</Heading>
          <Heading>Heading</Heading>
          <Section>
            <Heading>Sub-heading</Heading>
            <Heading>Sub-heading</Heading>
            <Heading>Sub-heading</Heading>
            <Section>
              <Heading>Sub-sub-heading</Heading>
              <Heading>Sub-sub-heading</Heading>
              <Heading>Sub-sub-heading</Heading>
            </Section>
          </Section>
        </Section>
      </Section> 
    </div>
  );
}
