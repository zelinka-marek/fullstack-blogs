import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { BlogDetails } from "./blog-details";

describe("<BlogDetails />", () => {
  beforeEach(() => {
    cleanup();
  });

  const validBlog = {
    id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    user: { username: "mzelinka", name: "Marek Zelinka" },
  };

  it("should only display blog's title and author", () => {
    render(<BlogDetails blog={validBlog} />);

    expect(screen.getByText(validBlog.title)).toBeVisible();
    expect(screen.getByText(validBlog.author)).toBeVisible();
    expect(screen.getByText(validBlog.url)).not.toBeVisible();
    expect(screen.getByText(`${validBlog.likes} likes`)).not.toBeVisible();
  });

  it("should display likes and url when expanded", async () => {
    render(<BlogDetails blog={validBlog} />);

    const button = screen.getByRole("button", { name: /view/i });
    await userEvent.click(button);

    expect(screen.getByText(validBlog.url)).toBeVisible();
    expect(screen.getByText(`${validBlog.likes} likes`)).toBeVisible();
  });

  it("should call the onLike hanlder when like button is clicked twice", async () => {
    const onLike = vi.fn();

    render(<BlogDetails blog={validBlog} onLike={onLike} />);

    const viewButton = screen.getByRole("button", { name: /view/i });
    await userEvent.click(viewButton);

    const likeButton = screen.getByRole("button", { name: /like/i });
    await userEvent.click(likeButton);
    await userEvent.click(likeButton);

    expect(onLike).toHaveBeenCalledTimes(2);
  });

  it("should call onLike with blog id", async () => {
    const onLike = vi.fn();

    render(<BlogDetails blog={validBlog} onLike={onLike} />);

    const viewButton = screen.getByRole("button", { name: /view/i });
    await userEvent.click(viewButton);

    const likeButton = screen.getByRole("button", { name: /like/i });
    await userEvent.click(likeButton);

    expect(onLike).toHaveBeenCalledWith(validBlog.id);
  });
});
