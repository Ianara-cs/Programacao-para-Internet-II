import { Heading } from "./Heading";
import { Section } from "./Section";

interface PostProps {
    title: string
    body: string
}

export function Post({ title, body }: PostProps) {
    return (
        <div className="Post">
            <Section isFancy={true}>
                <Heading>
                    {title}
                </Heading>
                <p><i>{body}</i></p>
            </Section>
        </div>
    )
}