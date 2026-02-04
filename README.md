# Astrophysical N-Body Gravitational Simulation

A browser-based **astrophysical N-body simulation** implementing professional numerical techniques used in computational physics and astronomy.  
The simulation models **two-body and three-body gravitational systems** using Newtonian gravity and a **symplectic Leapfrog (Velocity Verlet) integrator**, ensuring long-term energy stability and physically meaningful motion.

---

## Features

- **2-Body System**
  - Binary orbit dynamics
  - Momentum-conserving motion
  - Stable elliptical trajectories

- **3-Body System**
  - Fully chaotic gravitational dynamics
  - Sensitive dependence on initial conditions
  - Realistic astrophysical behavior

- **Physics-accurate modeling**
  - Newtonian gravitational force
  - Plummer softening to avoid singularities
  - Pairwise force symmetry (momentum conservation)

- **Professional numerical integration**
  - Leapfrog (Velocity Verlet) integrator
  - Symplectic method (energy-stable)
  - Used in real astrophysical simulations

- **Interactive controls**
  - Adjustable mass
  - Adjustable gravitational constant (G)
  - Adjustable timestep (Δt)
  - System selection (2-body / 3-body)

- **Visualization**
  - Orbit trails
  - Smooth real-time rendering
  - Clean, modern UI

---

## Physics Model

### Gravitational Force
The simulation uses Newton’s law of gravitation:

\[
\mathbf{F}_{ij} = G \frac{m_i m_j}{(r^2 + \varepsilon^2)^{3/2}} \mathbf{r}
\]

Where:
- \( G \) is the gravitational constant
- \( m_i, m_j \) are the masses
- \( \varepsilon \) is the Plummer softening length
- \( \mathbf{r} \) is the separation vector

Plummer softening prevents numerical divergence at short distances while preserving large-scale accuracy.

---

## Numerical Integration

This project uses the **Velocity Verlet (Leapfrog) integrator**, a second-order symplectic method:

1. Advance velocity by half a timestep  
2. Advance position by a full timestep  
3. Recompute accelerations  
4. Advance velocity by the remaining half timestep  

### Why Leapfrog?
- Conserves total energy over long simulations
- Prevents artificial orbital decay
- Standard in astrophysical N-body solvers

---

## Units & Scaling

- The simulation uses **dimensionless units**
- All quantities are internally consistent
- Focus is on **dynamical correctness**, not SI realism
- Easily extendable to physical units

---

## ▶️ How to Run

### Option 1: Local
1. Clone or download the repository
2. Open `index.html` in any modern web browser
3. Adjust parameters and observe orbital dynamics

---

## Author

Developed as a hobby project.
focused on physical accuracy and numerical stability.
