import { Heading } from "./Heading";
import { RecentPosts } from "./RecentPosts";
import { Section } from "./Section";

export function AllPosts () {
    return (
        <Section>
          <Heading>Posts</Heading>
          <RecentPosts />
        </Section>
    )
}