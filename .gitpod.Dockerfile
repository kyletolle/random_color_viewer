# Following steps at https://www.gitpod.io/docs/languages/deno/ to create this
# file and then installing it with steps at
# https://www.gitpod.io/docs/config-docker
FROM gitpod/workspace-full

RUN curl -fsSL https://deno.land/x/install/install.sh | sh
RUN /home/gitpod/.deno/bin/deno completions bash > /home/gitpod/.bashrc.d/90-deno &&     echo 'export DENO_INSTALL="/home/gitpod/.deno"' >> /home/gitpod/.bashrc.d/90-deno &&     echo 'export PATH="$DENO_INSTALL/bin:$PATH"' >> /home/gitpod/.bashrc.d/90-deno

# Install Cockroach CLI as mentioned at
# https://www.cockroachlabs.com/blog/cockroachdb-ccloud-cli/
RUN curl https://binaries.cockroachdb.com/ccloud/ccloud_linux-amd64_0.1.1.tar.gz | tar -xz && sudo cp -i ccloud /usr/local/bin/
