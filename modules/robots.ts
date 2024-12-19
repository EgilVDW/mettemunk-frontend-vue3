import { writeFile, unlink } from "node:fs/promises";
import * as fs from "node:fs";
import { join } from "pathe";
import chalk from "chalk";
import { defineNuxtModule } from "@nuxt/kit";
import type { Nuxt } from "nuxt/schema";

export default defineNuxtModule({
  meta: {
    name: "sitemap",
  },
  async setup(moduleOptions: RobotsModuleOptions, nuxt: Nuxt) {
    const filePath = "./public/";
    let config = ``;

    //* Default config options */
    const defaultConfig: RobotsModuleOptions = {
      sitemapPath: "/sitemap.xml",
      userAgent: "*",
      filePath: "./public/",
    };

    //* creates public directory if it doesn't exist' */
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }

    //* Set User-Agent property */

    //* Set Disallow property */
    config =
      config +
      `
User-agent: *
Disallow: ${
        nuxt.options.runtimeConfig.public.ROBOTS != null
          ? nuxt.options.runtimeConfig.public.ROBOTS === "true"
            ? ""
            : "/"
          : "/"
      }
`;

    //* Set sitemap path */
    config =
      config +
      `Sitemap: ${nuxt.options.runtimeConfig.public.BASE_URL}${
        moduleOptions.sitemapPath ?? defaultConfig.sitemapPath
      }\n`;

    nuxt.hook("build:before", async () => {
      //* Create robots.txt file */
      try {
        await writeFile(`${filePath}robots.txt`, config, {
          encoding: "utf8",
        });
        console.log(chalk.green("√"), chalk(`Robots.txt generated `));
      } catch (err) {
        console.log(chalk.bgRed.white(` ROBOTS ERR: ${err} `));
      }
    });

    nuxt.hook("close", async () => {
      try {
        await unlink(join(filePath, "robots.txt"));
      } catch (err) {
        console.log(chalk.bgRed.white(`ERR CLEANING FILES: ${err} `));
      }
    });
  },
});
