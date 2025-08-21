import { cn, formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Startup, Author } from "@/sanity/types";
import { Skeleton } from "./ui/skeleton";

export type StartupTypeCard = Omit<Startup, "author"> & {author?: Author}

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const {
    title,
    description,
    author,
    views,
    _createdAt,
    category,
    _id,
    image,
  } = post;
  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup_ard_date">{formatDate(_createdAt)}</p>

        <div className="flex gap-1.5">
          <EyeIcon className="text-primary" size={16} />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="text-16-medium line-clamp-1">{author?.name}</p>
          </Link>
          <Link href={`/startups/${_id}`}>
            <p className="text-26-semibold line-clamp-1">{title}</p>
          </Link>
        </div>

        <Link href={`/user/${author?._id}`}>
          <Image
            src={author?.image || ''}
            alt={author?.name || ''}
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>

      <Link href={`/startups/${_id}`}>
        <p className="startup-card_desc">{description}</p>
        <img src={image} alt="placeholder" className="startup-card_img" />
      </Link>

      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-16-medium"> {category} </p>
        </Link>

        <Button asChild className="startup-card_btn">
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};


export const StartupCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="startup-card_skeleton" />
      </li>
    ))}
  </>
);

export default StartupCard;
