import Home from "@/ui/screens/Home";
import { GetServerSideProps } from "next";

export default function Root() {
  return (
    <Home />
  )
}

export const getServerSideProps: GetServerSideProps = async (props) => {
  const paths = (props.resolvedUrl.split('/')?.filter((s: string) => s !== '') || []) as string[]
  console.log('paths', paths)
  return {
    props: {}
  }
}

