(function () {
        "use strict";

        const output = document.getElementById("output");
        const input = document.getElementById("cmd");
        const term = document.getElementById("terminal");

        const EMAIL = "Currie.ben" + "@" + "outlook.com"; // split to dodge naive scrapers
        const GITHUB = "https://github.com/BenCurrie42";
        const LINKEDIN =
          "https://www.linkedin.com/in/benjamin-currie-53571238a";
        const INSTAGRAM = "https://www.instagram.com/sir_ben_the_bold_/";
        const BLOG = "https://blog.crevex.tech";

        const PROJECTS = [
          {
            key: "pressbox",
            featured: true,
            aliases: ["press", "box", "media"],
            lang: "Python · Docker · HLS",
            url: GITHUB + "/PressBox",
            feature: "self-hosted · runs anywhere · zero-login streaming",
            desc: "A portable, self-hosted media control plane — one Docker container that runs anywhere (laptop, NAS, VPS, Pi) and unifies MLB.TV, Navidrome, and YouTube behind a single web app. A dashboard drives playback while a fullscreen /kiosk view on any device becomes 'the TV': live HLS game streams with home/away feed selection, a pitch tracker and batter-intel overlays, a Subsonic music queue, and an ambient schedule screensaver when idle. MLB.TV auth is handled entirely over the API — no browser login.",
          },

          {
            key: "agent-monitor-tui",
            featured: true,
            aliases: ["agent", "monitor", "tui", "amt"],
            lang: "Rust",
            url: GITHUB + "/Agent-Monitor-TUI",
            feature: "published on crates.io · real-time · keyboard-driven",
            desc: "A lazydocker-style terminal UI for watching Claude Code sessions as they happen. It tails the JSONL Claude writes to ~/.claude/projects in real time and gives you keyboard-driven browsing of sessions, per-event inspection, filtering, and live token-burn tracking. Published to crates.io — install with `cargo install agent-monitor-tui` or grab a prebuilt binary.",
          },

          {
            key: "navidrome-for-obsidian",
            featured: true,
            aliases: ["navidrome", "obsidian", "music", "player"],
            lang: "TypeScript · Obsidian · Subsonic",
            url: GITHUB + "/navidrome-player-for-obsidian",
            feature: "Obsidian plugin · full-quality · spinning vinyl",
            desc: "A Navidrome music player that lives in the Obsidian sidebar, so you never leave your vault to change a track. Full-quality playback over the Subsonic API, a browser for albums / artists / playlists, shuffle and a 'vibes' random-from-your-whole-library mode — and cover art that spins like a record while it plays. Two-minute setup.",
          },

          {
            key: "talos-homelab",
            aliases: ["talos", "homelab", "k8s"],
            lang: "Kubernetes · Talos",
            url: GITHUB + "/talosHomelab",
            desc: "A personal Kubernetes cluster running Talos Linux — an immutable, API-driven OS. My playground for distributed-systems research, service orchestration, and infrastructure experiments.",
          },

          {
            key: "cell-culture",
            aliases: ["cell", "culture"],
            lang: "TypeScript",
            url: GITHUB + "/Cell-Culture",
            desc: "Tooling for cell-culture workflows — AI and software engineering applied to biology and lab science. A small example of cross-domain systems thinking.",
          },
        ];

        const SKILLS = [
          "Distributed Systems",
          "AI Research",
          "TypeScript",
          "Python",
          "NixOS",
          "Kubernetes / Talos",
          "LLM Fine-tuning",
          "MCP Servers",
          "AI in Education",
          "Biola AI Lab",
        ];

        // ─── output helpers ───
        function esc(s) {
          return s
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
        }
        function print(html, cls) {
          const div = document.createElement("div");
          div.className = "line" + (cls ? " " + cls : "");
          div.innerHTML = html;
          output.appendChild(div);
        }
        function blank() {
          print("&nbsp;");
        }
        function scroll() {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          });
        }

        // ─── command implementations ───
        const commands = {
          help() {
            print(
              "Available commands — type one and press Enter:",
              "muted block",
            );
            const rows = [
              ["help", "show this list"],
              ["about", "who I am"],
              ["projects", "list what I've built  (alias: ls)"],
              ["open &lt;name&gt;", "open a project  (e.g. open talos)"],
              ["writing", "field reports on AI → blog"],
              ["skills", "the stack"],
              ["contact", "how to reach me"],
              ["github / linkedin / email / instagram", "quick links"],
              ["neofetch", "system summary"],
              ["banner", "the logo"],
              ["clear", "clear the screen"],
            ];
            let h = '<div class="kv">';
            rows.forEach(
              (r) =>
                (h +=
                  '<span class="k">' +
                  r[0] +
                  '</span><span class="v">' +
                  r[1] +
                  "</span>"),
            );
            h += "</div>";
            print(h, "block");
            print(
              '<span class="dim">tip: use ↑/↓ for history and Tab to autocomplete.</span>',
            );
          },

          about() {
            print("Ben Currie", "hi bold block");
            print(
              '<span class="green">AI Research</span> &amp; <span class="green">Distributed Systems</span> Engineer · AI Lab Associate @ Biola University',
              "muted",
            );
            blank();
            print(
              "I'm a software engineer and AI researcher working at the intersection of distributed systems, machine learning, and the human institutions they reshape. At the Biola AI Lab I explore what it looks like to build responsibly in a world being rewritten by AI.",
              "muted",
            );
            blank();
            print(
              'My work is shaped by a Christian framework of <span class="green">stewardship</span> — the conviction that technology is not neutral, and that <span class="hi">how</span> we build matters as much as <span class="hi">what</span> we build. I\'m especially interested in AI\'s role in education and industry: not as a shortcut, but as a tool that demands wisdom, discernment, and accountability.',
              "muted",
            );
            blank();
            print(
              "On the engineering side I work across TypeScript, Python, and Nix, run a Talos K8s Linux homelab, and build tools that bridge AI systems to real-world workflows — MCP servers, fine-tuned models, and automation pipelines.",
              "muted",
            );
            blank();
            print(
              '<span class="dim">→ try:</span> <span class="green">projects</span>, <span class="green">writing</span>, or <span class="green">contact</span>',
            );
          },

          projects() {
            print(
              'things I\'ve built — <span class="dim">run</span> <span class="green">open &lt;name&gt;</span> <span class="dim">for details</span>',
              "muted block",
            );
            const feat = PROJECTS.filter((p) => p.featured);
            const rest = PROJECTS.filter((p) => !p.featured);
            print('<span class="dim">── featured ──</span>');
            feat.forEach((p, i) => {
              print(
                '<span class="amber">★</span> <span class="name">' +
                  p.key +
                  '</span>  <span class="lang">[' +
                  p.lang +
                  "]</span>",
                "item",
              );
              print('<span class="dim indent">' + p.feature + "</span>");
            });
            blank();
            print('<span class="dim">── also ──</span>');
            rest.forEach((p) => {
              print(
                '<span class="dim">·</span> <span class="name">' +
                  p.key +
                  '</span>  <span class="lang">[' +
                  p.lang +
                  "]</span>",
                "item",
              );
            });
          },

          open(arg) {
            if (!arg) {
              print(
                'usage: <span class="green">open &lt;name&gt;</span> — see <span class="green">projects</span>',
                "amber",
              );
              return;
            }
            const p = findProject(arg);
            if (!p) {
              print(
                'project not found: <span class="red">' +
                  esc(arg) +
                  '</span>. run <span class="green">projects</span> to list them.',
                "amber",
              );
              return;
            }
            print(
              (p.featured ? '<span class="amber">★</span> ' : "📁 ") + p.key,
              "hi bold block",
            );
            if (p.feature)
              print('<span class="green">' + p.feature + "</span>");
            print('<span class="lang">' + p.lang + "</span>", "");
            print(p.desc, "muted block");
            print(
              '↗ <a href="' +
                p.url +
                '" target="_blank" rel="noopener">' +
                p.url +
                "</a>",
            );
          },

          writing() {
            print(
              "Field reports from the front lines of AI — honest thinking on stewardship, education, and building well. Not research papers; notes from someone studying and building in the middle of the transition.",
              "muted block",
            );
            print(
              '↗ read everything at <a href="' +
                BLOG +
                '" target="_blank" rel="noopener">blog.crevex.tech</a>',
            );
          },

          skills() {
            print("the stack:", "muted block");
            print(
              SKILLS.map((s) => '<span class="badge">' + s + "</span>").join(
                " ",
              ),
              "block",
            );
          },

          contact() {
            print(
              'Building something interesting? <span class="green">Let\'s talk.</span>',
              "hi block",
            );
            print(
              "AI research, distributed systems, a conference conversation, or a question about stewarding technology well — reach out.",
              "muted block",
            );
            const rows = [
              ["email", '<a href="mailto:' + EMAIL + '">' + EMAIL + "</a>"],
              [
                "github",
                '<a href="' +
                  GITHUB +
                  '" target="_blank" rel="noopener">BenCurrie42</a>',
              ],
              [
                "linkedin",
                '<a href="' +
                  LINKEDIN +
                  '" target="_blank" rel="noopener">/in/benjamin-currie</a>',
              ],
              [
                "instagram",
                '<a href="' +
                  INSTAGRAM +
                  '" target="_blank" rel="noopener">@sir_ben_the_bold_</a>',
              ],
            ];
            let h = '<div class="kv">';
            rows.forEach(
              (r) =>
                (h +=
                  '<span class="k">' +
                  r[0] +
                  '</span><span class="v">' +
                  r[1] +
                  "</span>"),
            );
            h += "</div>";
            print(h);
          },

          email() {
            print('✉ <a href="mailto:' + EMAIL + '">' + EMAIL + "</a>");
          },
          github() {
            print(
              '↗ <a href="' +
                GITHUB +
                '" target="_blank" rel="noopener">' +
                GITHUB +
                "</a>",
            );
          },
          linkedin() {
            print(
              '↗ <a href="' +
                LINKEDIN +
                '" target="_blank" rel="noopener">' +
                LINKEDIN +
                "</a>",
            );
          },
          instagram() {
            print(
              '↗ <a href="' +
                INSTAGRAM +
                '" target="_blank" rel="noopener">' +
                INSTAGRAM +
                "</a>",
            );
          },

          neofetch() {
            const art = [
              "        ___          ",
              "      /  _  \\        ",
              "     |  (_)  |       ",
              "      \\ ___ /        ",
              "     __|   |__       ",
              "    /  crevex \\      ",
            ];
            const info = [
              [
                '<span class="hi bold">ben</span>@<span class="hi bold">crevex</span>',
                "",
              ],
              ["────────────", ""],
              ["role", "AI Research / Distributed Systems Eng"],
              ["org", "Biola AI Lab"],
              ["domain", "crevex.tech"],
              ["focus", "AI Stewardship · Education · Infra"],
              ["stack", "TypeScript · Python · Nix · K8s"],
              ["faith", "Christian"],
              ["motto", "Build wisely."],
              ["uptime", "still building 🟢"],
            ];
            let h =
              '<div style="display:grid;grid-template-columns:max-content 1fr;gap:0 24px;align-items:center">';
            h +=
              '<pre class="green" style="margin:0">' +
              art.join("\n") +
              "</pre>";
            let right = "";
            info.forEach((r) => {
              if (!r[1]) right += '<div class="green">' + r[0] + "</div>";
              else
                right +=
                  '<div><span class="green">' +
                  r[0] +
                  '</span><span class="dim"> : </span><span class="muted">' +
                  r[1] +
                  "</span></div>";
            });
            h += "<div>" + right + "</div></div>";
            print(h, "block");
          },

          banner() {
            renderBanner();
          },

          verse() {
            print(
              '"Whatever you do, work at it with all your heart, as working for the Lord."',
              "green block",
            );
            print("— Colossians 3:23", "dim");
          },

          echo(arg) {
            print(arg ? esc(arg) : "&nbsp;");
          },

          sudo(arg) {
            if (/rm\s+-rf/.test(arg || "")) {
              print("Nice try. 😄 This is a portfolio, not a target.", "amber");
              return;
            }
            print(
              "ben is not in the sudoers file. This incident will be reported. 🫡",
              "red",
            );
          },

          whoami() {
            print("ben", "muted");
            print(
              '<span class="dim">(run</span> <span class="green">about</span> <span class="dim">for the long version)</span>',
            );
          },

          ls(arg) {
            if (arg && /^writing/.test(arg)) return commands.writing();
            if (arg && /^project/.test(arg)) return commands.projects();
            print(
              '<span class="green">about</span>  <span class="green">projects/</span>  <span class="green">writing/</span>  <span class="green">skills</span>  <span class="green">contact</span>  <span class="dim">README.md</span>',
            );
          },

          cat(arg) {
            if (!arg) {
              print("usage: cat &lt;file&gt;", "amber");
              return;
            }
            const a = arg.replace(/\.(txt|md|json)$/, "");
            if (commands[a]) return commands[a]();
            const p = findProject(a);
            if (p) return commands.open(a);
            print("cat: " + esc(arg) + ": No such file or directory", "amber");
          },

          clear() {
            output.innerHTML = "";
          },

          exit() {
            print("There's no escape — this is the web.", "amber");
          },
          pwd() {
            print("~/crevex.tech", "muted");
          },
          date() {
            print(new Date().toString(), "muted");
          },
        };

        // command aliases
        commands.projet = commands.project = commands.projects;
        commands.posts = commands.blog = commands.writing;
        commands.stack = commands.skills;
        commands.socials = commands.links = commands.contact;
        commands.info = commands.me = commands.about;

        // ─── lookup ───
        function findProject(arg) {
          const q = arg.toLowerCase().trim();
          if (/^\d+$/.test(q)) return PROJECTS[parseInt(q, 10) - 1] || null;
          return (
            PROJECTS.find((p) => p.key === q) ||
            PROJECTS.find((p) => p.aliases.includes(q)) ||
            PROJECTS.find((p) => p.key.includes(q)) ||
            PROJECTS.find((p) => p.aliases.some((a) => a.includes(q))) ||
            null
          );
        }

        // ─── banner + intro ───
        function renderBanner() {
          const art = document
            .getElementById("asciiBanner")
            .textContent.replace(/^\n/, "");
          const pre = document.createElement("pre");
          pre.className = "banner block";
          pre.textContent = art;
          output.appendChild(pre);
          print(
            '<span class="hi">crevex.tech</span> <span class="dim">— AI Research &amp; Distributed Systems</span>',
          );
        }

        function intro() {
          renderBanner();
          blank();
          print(
            "Welcome. This is an interactive terminal — everything here is a command away.",
            "muted",
          );
          print(
            'Type <span class="green bold">help</span> to see what you can do, or tap a chip below.',
            "muted",
          );
          print(
            '<span class="dim">Stewarding AI with intentionality · technology in service of the Kingdom.</span>',
          );
          blank();
        }

        // ─── command runner ───
        const history = [];
        let hIdx = 0;

        function echoCommand(raw) {
          const div = document.createElement("div");
          div.className = "line echo";
          div.innerHTML =
            '<span class="ps1"><span class="u">ben</span>@<span class="p">crevex</span>:~$</span> ' +
            '<span class="cmd">' +
            esc(raw) +
            "</span>";
          output.appendChild(div);
        }

        function run(raw) {
          const trimmed = raw.trim();
          echoCommand(raw);
          if (trimmed) {
            history.push(trimmed);
            hIdx = history.length;
          }
          if (!trimmed) {
            scroll();
            return;
          }

          const parts = trimmed.split(/\s+/);
          const cmd = parts.shift().toLowerCase();
          const arg = parts.join(" ");

          if (commands[cmd]) {
            try {
              commands[cmd](arg);
            } catch (e) {
              print("error running command.", "red");
            }
          } else {
            print(
              'command not found: <span class="red">' + esc(cmd) + "</span>",
              "amber",
            );
            const guess = suggest(cmd);
            if (guess)
              print(
                'did you mean <span class="green">' +
                  guess +
                  '</span>? · type <span class="green">help</span>',
                "dim",
              );
            else
              print(
                'type <span class="green">help</span> for a list of commands.',
                "dim",
              );
          }
          scroll();
        }

        // ─── autocomplete + suggestions ───
        function vocab() {
          const base = [
            "help",
            "about",
            "projects",
            "open",
            "writing",
            "blog",
            "skills",
            "contact",
            "github",
            "linkedin",
            "email",
            "instagram",
            "neofetch",
            "banner",
            "clear",
            "whoami",
            "ls",
            "cat",
            "echo",
            "verse",
            "date",
            "pwd",
          ];
          return base;
        }
        function suggest(cmd) {
          let best = null,
            bestScore = 99;
          vocab().forEach((v) => {
            const d = lev(cmd, v);
            if (d < bestScore) {
              bestScore = d;
              best = v;
            }
          });
          return bestScore <= 2 ? best : null;
        }
        function lev(a, b) {
          const m = [];
          for (let i = 0; i <= b.length; i++) m[i] = [i];
          for (let j = 0; j <= a.length; j++) m[0][j] = j;
          for (let i = 1; i <= b.length; i++)
            for (let j = 1; j <= a.length; j++)
              m[i][j] =
                b[i - 1] === a[j - 1]
                  ? m[i - 1][j - 1]
                  : Math.min(
                      m[i - 1][j - 1] + 1,
                      m[i][j - 1] + 1,
                      m[i - 1][j] + 1,
                    );
          return m[b.length][a.length];
        }
        function complete(val) {
          const parts = val.split(/\s+/);
          if (parts.length <= 1) {
            const m = vocab().filter((v) =>
              v.startsWith(parts[0].toLowerCase()),
            );
            if (m.length === 1) return m[0] + " ";
            if (m.length > 1) {
              print(m.join("   "), "dim");
              scroll();
            }
            return val;
          }
          // arg completion for open/read/cat
          const cmd = parts[0].toLowerCase();
          const frag = parts[parts.length - 1].toLowerCase();
          let pool = [];
          if (cmd === "open") pool = PROJECTS.map((p) => p.key);
          else if (cmd === "cat")
            pool = ["about", "contact", "skills"].concat(
              PROJECTS.map((p) => p.key),
            );
          const m = pool.filter((k) => k.startsWith(frag));
          if (m.length === 1) {
            parts[parts.length - 1] = m[0];
            return parts.join(" ");
          }
          if (m.length > 1) {
            print(m.join("   "), "dim");
            scroll();
          }
          return val;
        }

        // ─── input handling ───
        input.addEventListener("keydown", function (e) {
          if (e.key === "Enter") {
            const v = input.value;
            input.value = "";
            run(v);
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (hIdx > 0) {
              hIdx--;
              input.value = history[hIdx] || "";
              moveCaretEnd();
            }
          } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (hIdx < history.length - 1) {
              hIdx++;
              input.value = history[hIdx] || "";
            } else {
              hIdx = history.length;
              input.value = "";
            }
            moveCaretEnd();
          } else if (e.key === "Tab") {
            e.preventDefault();
            if (input.value.trim()) input.value = complete(input.value);
            moveCaretEnd();
          } else if (e.key === "l" && e.ctrlKey) {
            e.preventDefault();
            commands.clear();
          }
        });
        function moveCaretEnd() {
          const v = input.value;
          input.value = "";
          input.value = v;
        }

        // keep focus on input; clicking anywhere refocuses (but allow link/selection)
        document.addEventListener("click", function (e) {
          if (e.target.closest("a") || e.target.closest(".chip")) return;
          if (window.getSelection().toString()) return;
          input.focus();
        });

        document
          .getElementById("chips")
          .addEventListener("click", function (e) {
            const btn = e.target.closest(".chip");
            if (!btn) return;
            run(btn.dataset.cmd);
            input.focus();
          });

        // ─── boot ───
        intro();
        input.focus();
      })();