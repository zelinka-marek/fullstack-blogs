import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BlogDetails } from "./blog-details";

describe("<BlogDetails />", () => {
  it("should only display blog's title and author", () => {
    const validBlog = {
      title: "A good title",
      author: "Interesting Author",
      url: "https://interestingauthor.com/blog/a-ggod-title",
      likes: 0,
      user: { username: "mzelinka" },
    };

    render(<BlogDetails blog={validBlog} />);

    expect(screen.getByText(validBlog.title)).toBeVisible();
    expect(screen.getByText(validBlog.author)).toBeVisible();
    expect(screen.getByText(validBlog.url)).not.toBeVisible();
    expect(screen.getByText(`${validBlog.likes} likes`)).not.toBeVisible();
  });
});
