git co react/full
git reset --hard preact/full
git cpi origin/react/full || (echo "Conflicts detected! Stopping execution." && exit 1)
git pushfwl
git co react/light
git reset --hard react/full
git cpi origin/react/light || (echo "Conflicts detected! Stopping execution." && exit 1)
git pushfwl
git co preact/light
git reset --hard react/light
git cpi origin/preact/light || (echo "Conflicts detected! Stopping execution." && exit 1)
git pushfwl
git co preact/full
