import React, { useEffect, useState } from 'react';
import { Row } from 'components/ContainerFlex';
import { PidService } from 'servicesV2';
import PdfViewer from 'components/PdfViewer2';
import { GiHamburgerMenu } from 'react-icons/gi/index.esm';
import { FaLongArrowAltLeft } from 'react-icons/fa/index.esm';
import History from 'utils/history';
import { hostUrlBase } from 'services/Api';
import Header from 'components/HeaderHome';
import Tree from 'components/Area/Tree';
import { Link } from 'react-router-dom';
import {
  ContainerFlex,
  TreeContainer,
  PdfContainer,
  ButtonHandlerTree,
  BtnReturn,
} from './Styles';
import './sidebar.css';
import Sidebar from './Sidebar';

function Pids() {
  const [pidService] = useState(new PidService());
  const [treeState, setTreeState] = useState({
    data: {
      nodos: [],
    },
    isLoading: false,
    error: false,
  });
  const [openTree, setOpenTree] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});

  const [pidState, setPidState] = useState({
    pdf: null,
    keyPdf: null,
    isLoading: false,
    error: false,
  });

  const closeMediaPanel = () => {
    // Empty function since Pids doesn't have a media panel
    return;
  };

  const goBack = () => {
    History.goBack();
  };

  const toggleMenuTree = () => {
    setOpenTree(t => !t);
  };

  useEffect(() => {
    async function fetchTree() {
      try {
        setTreeState(t => ({ ...t, isLoading: true }));
        const response = await pidService.getTree();
        setTreeState(t => ({ ...t, data: response.data }));
      } catch (e) {
        setTreeState(t => ({ ...t, error: e }));
      } finally {
        setTreeState(t => ({ ...t, isLoading: false }));
      }
    }
    fetchTree();
  }, []);

  const handleClickBackTree = () => {
    setPidState({
      pdf: null,
      keyPdf: null,
      isLoading: false,
      error: false,
    });
  };

  const handleClickItem = async (item) => {
      if (!item || !item.id) return;
      
      try {
        // Si es un nodo con hijos, solo retornamos para permitir la navegación
        if (item.esNodo) {
          return;
        }
        
        // Solo procedemos a cargar el PDF si es un archivo
        if (item.esArchivo) {
          setPidState(t => ({ ...t, isLoading: true }));
          const response = await pidService.getPid(item.id);
          
          if (response && response.data && response.data.pdf && response.data.pdf.url) {
            setPidState(t => ({
              ...t,
              pdf: `${hostUrlBase}/${response.data.pdf.url}`,
              keyPdf: `${item.tipo || ''}${item.id}`,
            }));
            setOpenTree(false); // Solo cerramos el sidebar cuando se selecciona un archivo
          } else {
            console.error('Invalid PDF data received');
            setPidState(t => ({
              ...t,
              error: new Error('Invalid PDF data'),
            }));
          }
        }
      } catch (e) {
        console.error('Error fetching PID:', e);
        setPidState(t => ({ 
          ...t, 
          error: e,
          pdf: null,
          keyPdf: null 
        }));
      } finally {
        setPidState(t => ({ ...t, isLoading: false }));
      }
    };

  const toggleSubmenu = (menuKey) => {
    setOpenSubmenus({
      ...openSubmenus,
      [menuKey]: !openSubmenus[menuKey],
    });
  };

  const handleToggleSidebar = (isOpen) => {
    setOpenTree(isOpen);
  };

  return (
    <ContainerFlex>
      <Header />
      <Row padding="50px 0 0 0">
        <TreeContainer open={openTree}>
            {treeState.data && (
                <Sidebar
                  area={treeState.data}
                  handleClickItem={handleClickItem}
                  toggleSubmenu={toggleSubmenu}
                  openSubmenus={openSubmenus}
                  onToggle={handleToggleSidebar}
                  closeMediaPanel={closeMediaPanel}
                />
              )}
        </TreeContainer>
        {pidState.pdf && (
          <PdfContainer key={pidState.keyPdf}>
            <PdfViewer url={pidState.pdf} />
          </PdfContainer>
        )}
      </Row>
    </ContainerFlex>
  );
}

export default Pids;
