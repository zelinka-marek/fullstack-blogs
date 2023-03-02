import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { BlogDetails } from "./blog-details";

describe("<BlogDetails />", () => {
  beforeEach(() => {
    cleanup();
  });

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

  it("should display likes and url when expanded", async () => {
    const validBlog = {
      title: "A good title",
      author: "Interesting Author",
      url: "https://interestingauthor.com/blog/a-ggod-title",
      likes: 0,
      user: { username: "mzelinka" },
    };

    render(<BlogDetails blog={validBlog} />);

    const button = screen.getByRole("button", { name: /view/i });
    await userEvent.click(button);

    expect(screen.getByText(validBlog.url)).toBeVisible();
    expect(screen.getByText(`${validBlog.likes} likes`)).toBeVisible();
  });

  it("should call the onLike hanlder when like button is clicked twice", async () => {
    const validBlog = {
      title: "A good title",
      author: "Interesting Author",
      url: "https://interestingauthor.com/blog/a-ggod-title",
      likes: 0,
      user: { username: "mzelinka" },
    };
    const onLike = vi.fn();

    render(<BlogDetails blog={validBlog} onLike={onLike} />);

    const viewButton = screen.getByRole("button", { name: /view/i });
    await userEvent.click(viewButton);

    const button = screen.getByRole("button", { name: /like/i });
    await userEvent.click(button);
    await userEvent.click(button);

    expect(onLike).toHaveBeenCalledTimes(2);
  });
});
