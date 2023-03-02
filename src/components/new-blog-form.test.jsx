import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { NewBlogForm } from "./new-blog-form";

describe("<NewBlogForm />", () => {
  it("should call onSubmit with right data", async () => {
    const onSubmit = vi.fn();

    render(<NewBlogForm onSubmit={onSubmit} />);

    const validBlog = {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    };

    await userEvent.type(
      screen.getByRole("textbox", { name: /title/i }),
      validBlog.title
    );
    await userEvent.type(
      screen.getByRole("textbox", { name: /author/i }),
      validBlog.author
    );
    await userEvent.type(
      screen.getByRole("textbox", { name: /url/i }),
      validBlog.url
    );

    const button = screen.getByRole("button", { name: /save blog/i });
    await userEvent.click(button);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(validBlog);
  });
});
