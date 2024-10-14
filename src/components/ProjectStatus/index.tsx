import {Image, Linking, Text, View} from 'react-native';
import React from 'react';
import {Button} from '../Elements';
import {ButtonThemes} from '../Elements/Button/types';
import {usePatchData} from '../../hooks/useQuery';
import {ENDPOINTS} from '../../config/endpoints';
import CreateContributionTierForm from '../Forms/ContributionTier/Create';
import EditProjectForm from '../Forms/Project/Edit';
import themedStyles from './styles';
import {useModal} from '../../hooks/useModal';
import {useTheme} from '../../hooks/useTheme';
import Contribute from '../Forms/Project/Contribute';
import PostExclusiveContentsForm from '../Forms/ExclusiveContents/create';
import successImage from '../../assets/images/success.png';
import errorImage from '../../assets/images/error.png';
import {ProjectStatus} from '../Projects/types';

const EditProject = ({projectId}: {projectId: string}) => {
  const mutation = usePatchData(ENDPOINTS.PROJECTS);
  const styles = useTheme(themedStyles);
  const {show} = useModal();

  const AddContributionTier = () => {
    show({
      title: 'Add contribution tier',
      description: 'And enable fans to support you',
      content: <CreateContributionTierForm id={projectId} />,
    });
  };
  const edit = () => {
    show({
      title: 'Edit your project',
      description: 'Improvement is always a good thing',
      content: <EditProjectForm id={projectId} />,
    });
  };
  const publish = () => {
    show({
      title: 'Are you done editing?',
      description:
        'Once you go live, your fans will be able to contribute in your project. Please note that you will no longer be able to edit this project.',
      onPrimaryPress: async () => {
        try {
          await mutation.mutate({
            id: projectId,
            data: {
              status: ProjectStatus.Published,
            },
          });
        } catch (e) {
          console.error('Error updating project status:', e);
        }
      },
    });
  };
  return (
    <View style={[[styles.editWrapper, styles.spacer]]}>
      <Text style={[styles.large, styles.statusTitle, styles.spacerMini]}>
        Now What
      </Text>
      <Text style={[styles.medium, styles.spacerLarge, styles.neutralZero]}>
        You Can edit your project if needed, and once ready,publish it.
      </Text>
      <Text style={[styles.semi, styles.spacerLarge, styles.neutralZero]}>
        You can add up to 5 contribution tiers.
      </Text>
      <Button
        title="Add contribution tier"
        theme={ButtonThemes.secondary}
        onPress={AddContributionTier}
        wrapperStyle={styles.spacerMini}
      />
      <Button
        title="Go live"
        theme={ButtonThemes.secondary}
        onPress={publish}
        wrapperStyle={styles.spacerMini}
      />

      <Button
        title="Edit"
        theme={ButtonThemes.primary}
        onPress={edit}
        wrapperStyle={styles.spacerMini}
      />
    </View>
  );
};

const SupportProject = ({projectId}: {projectId: string}) => {
  const styles = useTheme(themedStyles);
  const {show} = useModal();
  const support = () => {
    show({
      title: 'Support art & culture',
      description: "You're about to make a difference",
      content: <Contribute projectId={projectId} />,
    });
  };

  return (
    <View style={[[styles.publishedWrapper]]}>
      <Text style={[styles.large, styles.statusTitle, styles.spacerMini]}>
        Your time to shine
      </Text>
      <Text style={[styles.medium, styles.spacerLarge]}>
        You can now contribute in this project and become a part of it.
      </Text>
      <Text style={[styles.semi, styles.spacerLarge]}>
        Every small contribution matters.
      </Text>
      <Button
        title="Support"
        theme={ButtonThemes.secondary}
        onPress={support}
        wrapperStyle={styles.spacerMini}
      />
      <Button
        title="Share"
        theme={ButtonThemes.secondary}
        onPress={() => Linking.openURL(`https://viora.com/${projectId}`)}
      />
    </View>
  );
};

const PublishedProjectOwner = () => {
  const styles = useTheme(themedStyles);

  return (
    <View style={[[styles.publishedWrapper, styles.spacerMini]]}>
      <Text style={[styles.large, styles.statusTitle, styles.spacerMini]}>
        You can win this
      </Text>
      <Text style={[styles.semi, styles.spacerLarge]}>
        Your project is published.
      </Text>
      <Text style={[styles.semi, styles.spacerLarge]}>
        Reach out to your fans in your socials and ask them to support you.
      </Text>
      <Button
        title="Share"
        theme={ButtonThemes.secondary}
        onPress={() => Linking.openURL('https://viora.com/')}
      />
    </View>
  );
};
const SuccessfulProjectOwner = ({projectId}: {projectId: string}) => {
  const mutation = usePatchData(ENDPOINTS.PROJECTS);
  const styles = useTheme(themedStyles);
  const {show} = useModal();
  const withdraw = () => {
    show({
      title: 'Congratulation!',
      description:
        'We are happy that you have succeed in raising funds. Everybody is looking forward to hear more about your music. Use the funds to make the dream come true!',
      onPrimaryPress: async () => {
        try {
          await mutation.mutate({
            id: projectId,
            data: {
              status: ProjectStatus.Withdrawn,
            },
          });
        } catch (e) {
          console.error('Error updating project status:', e);
        }
      },
    });
  };
  const postExclusiveContent = () => {
    show({
      title: 'Post Exclusive content',
      description: 'Improvement is always a good thing',
      content: <PostExclusiveContentsForm projectId={projectId} />,
    });
  };

  return (
    <View style={[styles.successWrapper, styles.spacer]}>
      <Text style={[styles.large, styles.statusTitle]}>Successful</Text>
      <Text style={[styles.summary, styles.spacerLarge]}>
        Your project has successfully raised funds. Now is the time to shine!
      </Text>
      <Text style={[styles.summary, styles.spacerLarge]}>
        Once ready, you can post updates to deliver your promise.
      </Text>
      <Image source={successImage} style={[styles.image, styles.spacerSemi]} />
      <Button
        title="Post exclusive content"
        theme={ButtonThemes.secondary}
        onPress={postExclusiveContent}
        wrapperStyle={styles.spacerMini}
      />
      <Button
        title="Withdraw"
        theme={ButtonThemes.secondary}
        onPress={withdraw}
        wrapperStyle={styles.spacerMini}
      />
    </View>
  );
};

const SuccessfulProjectContributor = () => {
  const styles = useTheme(themedStyles);

  return (
    <View style={[[styles.successWrapper]]}>
      <Text style={[styles.large, styles.statusTitle, styles.spacerMini]}>
        Successful
      </Text>
      <Text style={[styles.semi, styles.spacer]}>
        This project has successfully raised funds. Once ready, The artist will
        publish updates to deliver your rewards.
      </Text>
      <Image source={successImage} style={[styles.image, styles.spacerSemi]} />
    </View>
  );
};

const FailingProjectOwner = () => {
  const styles = useTheme(themedStyles);

  return (
    <View style={[[styles.ownerFailWrapper, styles.spacer]]}>
      <Text style={[styles.large, styles.statusTitle]}>We're Sorry</Text>
      <Text style={[styles.semi, styles.spacer]}>
        This project did not raise the required funds.
      </Text>
      <Image source={errorImage} style={[styles.image, styles.spacerSemi]} />
    </View>
  );
};

export {
  EditProject,
  SupportProject,
  PublishedProjectOwner,
  SuccessfulProjectOwner,
  SuccessfulProjectContributor,
  FailingProjectOwner,
};
