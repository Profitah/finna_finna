import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { IoIosAddCircle } from 'react-icons/io';

const HomeWrap2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 3vh;
  position: relative;
`;

const UserPKG = styled.div`
  border: 0.5px solid #BFBABA;
  border-radius: 20px;
  margin-bottom: 2vh;
  width: 80vw;
  height: 150px;

  @media all and (min-width: 768px) and (max-width: 3000px) {
    width: 40vw;
    margin-bottom: 4vh;
  }
`;

const S2Wrap = styled.div`
  width: 68vw;
  height: 95px;
  margin-left: 5vw;

  @media all and (min-width: 768px) and (max-width: 3000px) {
    width: 35vw;
    margin-left: 2vw;
  }
`;

const Pkg2 = styled.div`
  display: flex;
`;

const Pkg3 = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 3vw;

  @media all and (min-width: 768px) and (max-width: 3000px) {
    margin-right: 1vw;
  }
`;

const BtnS2 = styled.button`
  background-color: inherit;
  margin-bottom: 20px;
  border: none;
  position: relative;
  right: 20px;
`;

const UserRname = styled.div`
  padding-top: 25px;
  font-size: 20px;
  margin-bottom: 3px;
`;

const Datetxt = styled.div`
  margin-bottom: 4px;
  font-size: 13px;
`;

const MemoText = styled.div``;

const StatusIndicator = styled.div`
  padding-top: 12px;
    padding-bottom: 12px;
    text-align: center;
    width: 65px;
    height: 20px;
    border: none;
    border-radius: 10px;
    position: relative;
    top: 80px;
  background-color: ${(props) => props.statusColor};

  @media all and (min-width: 768px) and (max-width: 3000px) {
  }
`;

const StatusText = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: white;
  text-align: center;
`;

const RoutineZero = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  position: absolute;
  top: 53%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ed8c37;
  font-weight: 340;
`;

const Zero1 = styled.div`
  line-height: 28px;
`;

const ToHomeAddPackage = styled(IoIosAddCircle)`
  position: fixed;
  bottom: 5vh;
  right: 10vw;
  font-size: 50px;
  color: #ed8c37;
  background-color: inherit;
  cursor: pointer;
`;

const getStatusColor = (endDate) => {
  const today = new Date();
  const end = new Date(endDate);
  return end < today ? '#808080' : '#ed8c37';
};

const getStatusText = (endDate) => {
  const today = new Date();
  const end = new Date(endDate);
  return end < today ? 'Over' : 'ongoing';
};

const Homesection2 = () => {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('https://dofarming.duckdns.org/api/v1/track', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const newPackages = response.data.map((pkg) => {
          const [routine, memo] = pkg.content.split(', ');
          return { ...pkg, routine, memo };
        });
        setPackages(newPackages);
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };

    fetchPackages();
  }, []);

  const handleDeletePackage = async (trackId) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`https://dofarming.duckdns.org/api/v1/track/${trackId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setPackages(packages.filter(pkg => pkg.trackId !== trackId));
    } catch (error) {
      console.error('Error deleting package:', error);
    }
  };

  return (
    <>
      {packages.length === 0 && (
        <RoutineZero>
          <Zero1>No routine yet
            <br /> Please make a routine first
          </Zero1>
        </RoutineZero>
      )}

      {packages.length > 0 && (
        <HomeWrap2>
          {packages.map((pkg) => (
            <UserPKG key={pkg.trackId}>
              <Pkg2>
                <S2Wrap onClick={() => navigate(`/todo?trackId=${pkg.trackId}`)}>
                  <UserRname>{pkg.routine}</UserRname>
                  <Datetxt>{pkg.startDate} ~ {pkg.endDate}</Datetxt>
                  <MemoText>Memo: {pkg.memo}</MemoText>
                </S2Wrap>
                <Pkg3>
                  <StatusIndicator statusColor={getStatusColor(pkg.endDate)}>
                    <StatusText>
                      {getStatusText(pkg.endDate)}
                    </StatusText>
                  </StatusIndicator>
                  <BtnS2 onClick={(e) => { e.stopPropagation(); handleDeletePackage(pkg.trackId); }}>
                    X
                  </BtnS2>
                </Pkg3>
              </Pkg2>
            </UserPKG>
          ))}
        </HomeWrap2>
      )}
      <Link to="/HomeAddPackage">
        <ToHomeAddPackage />
      </Link>
    </>
  );
};

export default Homesection2;