import React, { useState, useEffect, useRef } from 'react';
import Modal from '@components/Modal';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Icon } from '@components/icons';

const StyledProjectsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: clamp(24px, 5vw, var(--fz-heading));
  }

  .archive-link {
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    &:after {
      bottom: 0.1em;
    }
  }

  .projects-grid {
    ${({ theme }) => theme.mixins.resetList};
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 15px;
    position: relative;
    margin-top: 50px;

    @media (max-width: 1080px) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }

  .more-button {
    ${({ theme }) => theme.mixins.button};
    margin: 80px auto 0;
  }
`;

const StyledProject = styled.li`
  position: relative;
  cursor: default;
  transition: var(--transition);

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      .project-inner {
        transform: translateY(-7px);
      }
    }
  }

  a {
    position: relative;
    z-index: 1;
  }

  .project-inner {
    ${({ theme }) => theme.mixins.boxShadow};
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    height: 100%;
    padding: 2rem 1.75rem;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    transition: var(--transition);
    overflow: auto;
  }

  .project-top {
    ${({ theme }) => theme.mixins.flexBetween};
    margin-bottom: 35px;

    .folder {
      color: var(--green);
      svg {
        width: 40px;
        height: 40px;
      }
    }

    .project-links {
      display: flex;
      align-items: center;
      margin-right: -10px;
      color: var(--light-slate);

      a {
        ${({ theme }) => theme.mixins.flexCenter};
        padding: 5px 7px;

        &.external {
          svg {
            width: 22px;
            height: 22px;
            margin-top: -4px;
          }
        }

        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  .project-title {
    margin: 0 0 10px;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);

    a {
      position: static;

      &:before {
        content: '';
        display: block;
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
  }

  .project-description {
    color: var(--light-slate);
    font-size: 17px;

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  .project-tech-list {
    display: flex;
    align-items: flex-end;
    flex-grow: 1;
    flex-wrap: wrap;
    padding: 0;
    margin: 20px 0 0 0;
    list-style: none;

    li {
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      line-height: 1.75;

      &:not(:last-of-type) {
        margin-right: 15px;
      }
    }
  }
`;

const Projects = () => {
  const revealTitle = useRef(null);
  const revealProjects = useRef([]);
  const revealArchiveLink = useRef(null);

  const [showMore] = useState(false);
  const [showCertificates, setShowCertificates] = useState(false);
  //Image Modal State
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = certificate => {
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCertificate(null);
    setIsModalOpen(false);
  };

  const GRID_LIMIT = 6;

  useEffect(() => {
    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealArchiveLink.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  const data = useStaticQuery(graphql`
    query {
      projects: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/content/projects/" }
          frontmatter: { showInProjects: { ne: false } }
        }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              tech
              github
              external
            }
            html
          }
        }
      }
      certificates: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/certificates/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              external
              image
            }
            html
          }
        }
      }
    }
  `);

  const projectInner = node => {
    const { frontmatter, html } = node;
    const { title, tech, github, external } = frontmatter;

    return (
      <div className="project-inner">
        <header>
          <div className="project-top">
            <div className="folder">
              <Icon name="Folder" />
            </div>
            <div className="project-links">
              {github && (
                <a href={github} aria-label="GitHub Link" target="_blank" rel="noreferrer">
                  <Icon name="GitHub" />
                </a>
              )}
              {external && (
                <a
                  href={external}
                  aria-label="External Link"
                  className="external"
                  target="_blank"
                  rel="noreferrer">
                  <Icon name="External" />
                </a>
              )}
            </div>
          </div>
          <h3 className="project-title">
            <a href={external || github} target="_blank" rel="noreferrer">
              {title}
            </a>
          </h3>
          <div className="project-description" dangerouslySetInnerHTML={{ __html: html }} />
        </header>
        <footer>
          {tech && (
            <ul className="project-tech-list">
              {tech.map((techItem, i) => (
                <li key={i}>{techItem}</li>
              ))}
            </ul>
          )}
        </footer>
      </div>
    );
  };

  const certificateInner = node => {
    const { frontmatter, html } = node;
    const { title, image } = frontmatter;

    return (
      <div
        className="project-inner"
        role="button"
        tabIndex={0}
        onClick={() => openModal({ title, image: image })}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            openModal({ title, image: image });
          }
        }}
        style={{ cursor: 'pointer' }}>
        <header>
          <div className="project-top">
            <div className="folder">
              <Icon name="Folder" />
            </div>
          </div>
          <h3 className="project-title">{title}</h3>
          <div className="project-description" dangerouslySetInnerHTML={{ __html: html }} />
        </header>
      </div>
    );
  };

  const projects = data.projects.edges.filter(({ node }) => node);
  const certificates = data.certificates.edges.filter(({ node }) => node);

  const firstSix = projects.slice(0, GRID_LIMIT);
  const itemsToShow = showCertificates ? certificates : showMore ? projects : firstSix;

  return (
    <StyledProjectsSection>
      <h2 className="numbered-heading" ref={revealTitle}>
        {showCertificates ? 'Credential Vault' : 'Other Noteworthy Projects'}
      </h2>

      {/* Archive link should only show when certificates are not shown, or you can adjust logic */}
      {!showCertificates && (
        <Link className="inline-link archive-link" to="/archive" ref={revealArchiveLink}>
          view the archive
        </Link>
      )}

      <TransitionGroup className="projects-grid">
        {itemsToShow &&
          itemsToShow.map(({ node }, i) => (
            <CSSTransition
              key={i}
              classNames="fadeup"
              timeout={i >= GRID_LIMIT ? (i - GRID_LIMIT) * 300 : 300}
              exit={false}>
              <StyledProject
                key={i}
                ref={el => (revealProjects.current[i] = el)}
                style={{
                  transitionDelay: `${i >= GRID_LIMIT ? (i - GRID_LIMIT) * 100 : 0}ms`,
                }}>
                {showCertificates ? certificateInner(node) : projectInner(node)}
              </StyledProject>
            </CSSTransition>
          ))}
      </TransitionGroup>

      <button className="more-button" onClick={() => setShowCertificates(!showCertificates)}>
        {showCertificates ? 'Show Projects' : 'Credential Vault'}
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedCertificate && (
          <div className="modal-content">
            <h3 className="modal-title">{selectedCertificate.title}</h3>
            <img
              src={selectedCertificate.image}
              alt={selectedCertificate.title}
              loading="lazy"
              className="modal-image"
            />
          </div>
        )}
      </Modal>
    </StyledProjectsSection>
  );
};

export default Projects;
